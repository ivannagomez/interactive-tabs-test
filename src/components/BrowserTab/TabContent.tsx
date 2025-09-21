import React from 'react';
import type { Tab } from '../../types';

interface TabContentProps {
  activeTab: Tab | null;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-400">No tab selected</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      {activeTab.url && activeTab.url.startsWith('http') ? (
        <iframe
          src={activeTab.url}
          title={activeTab.title}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">{activeTab.title}</h2>
          {activeTab.content ? (
            <div className="prose max-w-none">{activeTab.content}</div>
          ) : (
            <div className="text-gray-500">
              <p>URL: {activeTab.url || 'New Tab'}</p>
              <p className="mt-4">
                This tab is displaying local content. To view external websites,
                ensure the URL starts with http:// or https://
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabContent;