import React from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Search, MoreVertical } from 'lucide-react';
import TabBar from '../BrowserTab/TabBar';
import TabContent from '../BrowserTab/TabContent';
import useTabs from '../../hooks/useTabs';
import type { Tab } from '../../types';

interface BrowserWindowProps {
  initialTabs?: Tab[];
  windowId?: string;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({ initialTabs, windowId }) => {
  const {
    tabs,
    activeTabId,
    activeTab,
    addTab,
    closeTab,
    setActiveTab,
    reorderTabs,
  } = useTabs(initialTabs);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Browser Chrome Header */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300">

        {/* Tab Bar */}
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId}
          onTabClose={closeTab}
          onTabClick={setActiveTab}
          onTabReorder={reorderTabs}
          onNewTab={addTab}
        />

        {/* Navigation Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-gray-200">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <RotateCw className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <Home className="w-4 h-4 text-gray-600" />
          </button>

          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={activeTab?.url || ''}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              placeholder="Search or enter address"
            />
          </div>

          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default BrowserWindow;