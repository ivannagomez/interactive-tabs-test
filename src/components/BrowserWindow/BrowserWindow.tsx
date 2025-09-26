import React from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Search, Home } from 'lucide-react';
import TabContent from '../BrowserTab/TabContent';
import type { Tab } from '../../types';

interface BrowserWindowProps {
  tabs: Tab[];
  activeTabId: string | null;
  activeTab: Tab | undefined;
  onFocus?: () => void;
  isActive?: boolean;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({ tabs, activeTabId, activeTab, onFocus, isActive }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 px-3 py-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RotateCw className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Home className="w-3.5 h-3.5 text-gray-600" />
          </button>

          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
            {/* <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div> */}
            <input
              type="text"
              value={activeTab?.url || ''}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              placeholder="Search or enter address"
            />
            <Search className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <TabContent activeTab={activeTab} onFocus={onFocus} isActive={isActive} />
    </div>
  );
};

export default BrowserWindow;