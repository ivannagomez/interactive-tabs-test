import React from 'react';
import type { Tab } from '../../types';
import { Globe, Github, Twitter, Code2, Search } from 'lucide-react';

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

  // Mock content for different sites
  const getMockContent = () => {
    const url = activeTab.url?.toLowerCase() || '';

    if (url.includes('github')) {
      return (
        <div className="p-8 bg-gray-50 h-full">
          <div className="flex items-center gap-3 mb-6">
            <Github className="w-10 h-10" />
            <h1 className="text-3xl font-bold">GitHub</h1>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">Popular repositories</h2>
            <div className="space-y-2">
              <div className="p-3 border rounded hover:bg-gray-50">📦 awesome-project</div>
              <div className="p-3 border rounded hover:bg-gray-50">🚀 react-components</div>
              <div className="p-3 border rounded hover:bg-gray-50">💻 developer-tools</div>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes('twitter') || url.includes('x.com')) {
      return (
        <div className="p-8 bg-black text-white h-full">
          <div className="flex items-center gap-3 mb-6">
            <Twitter className="w-10 h-10" fill="white" />
            <h1 className="text-3xl font-bold">X</h1>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="font-bold">Tech News</p>
              <p className="text-gray-300 mt-2">Latest updates in technology...</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="font-bold">Developer Community</p>
              <p className="text-gray-300 mt-2">Join the conversation...</p>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes('stackoverflow')) {
      return (
        <div className="p-8 bg-gray-50 h-full">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-10 h-10 text-orange-500" />
            <h1 className="text-3xl font-bold">Stack Overflow</h1>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Top Questions</h2>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-orange-500 bg-gray-50">
                <p className="font-medium">How to center a div?</p>
                <p className="text-sm text-gray-600 mt-1">2,543 answers</p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-gray-50">
                <p className="font-medium">JavaScript async/await explained</p>
                <p className="text-sm text-gray-600 mt-1">✓ Answered</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (url.includes('google')) {
      return (
        <div className="p-8 bg-white h-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-normal mb-8">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
          <div className="w-full max-w-md">
            <div className="flex items-center border rounded-full px-4 py-2 hover:shadow-lg transition-shadow">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                className="flex-1 outline-none"
                placeholder="Search Google or type a URL"
                readOnly
              />
            </div>
          </div>
        </div>
      );
    }

    // Default content for other sites
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          {activeTab.favicon ? (
            <img src={activeTab.favicon} alt="" className="w-8 h-8" />
          ) : (
            <Globe className="w-8 h-8 text-gray-500" />
          )}
          <h2 className="text-2xl font-bold">{activeTab.title}</h2>
        </div>
        {activeTab.content ? (
          <div className="prose max-w-none">{activeTab.content}</div>
        ) : (
          <div className="text-gray-500">
            <p>URL: {activeTab.url || 'New Tab'}</p>
            <p className="mt-4">
              This is a mock browser window. Click anywhere to focus this window.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-white h-full overflow-auto">
      {getMockContent()}
    </div>
  );
};

export default TabContent;