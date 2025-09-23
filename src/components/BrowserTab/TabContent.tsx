import React from 'react';
import type { Tab } from '../../types';
import { Globe, Github, Twitter, Code2, Search, FileText, Folder, FolderOpen, Coffee } from 'lucide-react';
import test1 from '../../assets/test-1.jpg';
import test2 from '../../assets/test-2.jpg';
import test3 from '../../assets/test-3.jpg';

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

    // Check if content specifies an image
    if (activeTab.content?.startsWith('image:')) {
      const imageName = activeTab.content.replace('image:', '');
      let imageSrc;

      switch (imageName) {
        case 'test-1.jpg':
          imageSrc = test1;
          break;
        case 'test-2.jpg':
          imageSrc = test2;
          break;
        case 'test-3.jpg':
          imageSrc = test3;
          break;
        default:
          imageSrc = null;
      }

      if (imageSrc) {
        return (
          <div className="flex-1 bg-white h-full overflow-auto">
            <img
              src={imageSrc}
              alt={activeTab.title}
              className="w-full h-auto object-cover"
            />
          </div>
        );
      }
    }

    if (url.includes('http://localhost:1111')) {
      return (
        <div className="flex h-full bg-gray-800 text-white font-inter">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Explorer Header */}
            <div className="p-3 text-xs uppercase tracking-wide text-gray-400 bg-gray-800 border-b border-gray-700">
              Explorer
            </div>

            {/* File Tree */}
            <div className="flex-1 p-2 text-sm">
              <div className="mb-2">
                <div className="flex items-center gap-1 text-gray-300 mb-1">
                  <FolderOpen className="w-4 h-4" />
                  <span className="font-medium">interactive-browser-playground</span>
                </div>
                <div className="ml-5 space-y-1">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Folder className="w-3 h-3" />
                    <span>src/</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Folder className="w-3 h-3" />
                      <span>components/</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Folder className="w-3 h-3" />
                      <span>hooks/</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                      <FileText className="w-3 h-3" />
                      <span>README.md</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <FileText className="w-3 h-3" />
                    <span>package.json</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <FileText className="w-3 h-3" />
                    <span>tailwind.config.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            {/* Tab Bar */}
            <div className="flex bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-r border-gray-700">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-200">README.md</span>
                <button className="ml-2 text-gray-500 hover:text-gray-300">×</button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-auto bg-gray-800 font-ibm-plex-mono text-sm leading-6">
              <div className="flex">
                {/* Line Numbers */}
                <div className="bg-gray-800 px-4 py-6 text-gray-500 text-right select-none border-gray-700">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div key={i + 1} className="leading-6">{i + 1}</div>
                  ))}
                </div>

                {/* Code Content */}
                <div className="flex-1 p-6">
                  <div className="text-gray-300">
                    {/* Markdown-style code with syntax highlighting */}
                    <div className="space-y-1">

                      <div><span className="text-gray-400">// A case study showcasing modern web development</span></div>
                      <div><span className="text-gray-400">// Built with React + Tailwind CSS</span></div>
                      <div className="text-gray-500"></div>

                      <div><span className="text-violet-300">##</span> <span className="text-sky-300 font-semibold">Project Overview</span></div>
                      <div className="text-gray-500"></div>
                      <div><span className="text-pink-300">const</span> <span className="text-gray-200">project</span> <span className="text-rose-300">=</span> <span className="text-purple-300">{'{'}</span></div>
                      <div>  <span className="text-emerald-300">name</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Interactive Browser Playground"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">purpose</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Learning React + Tailwind"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">features</span><span className="text-rose-300">:</span> <span className="text-purple-300">[</span></div>
                      <div>    <span className="text-sky-300">"Draggable browser windows"</span><span className="text-gray-400">,</span></div>
                      <div>    <span className="text-sky-300">"Mac Safari-inspired design"</span><span className="text-gray-400">,</span></div>
                      <div>    <span className="text-sky-300">"Custom tab reordering"</span><span className="text-gray-400">,</span></div>
                      <div>    <span className="text-sky-300">"Responsive window management"</span></div>
                      <div>  <span className="text-purple-300">]</span></div>
                      <div><span className="text-purple-300">{'}'}</span><span className="text-gray-400">;</span></div>
                      <div className="text-gray-500"></div>

                      <div><span className="text-violet-300">##</span> <span className="text-sky-300 font-semibold">Tech Stack</span></div>
                      <div className="text-gray-500"></div>
                      <div><span className="text-pink-300">interface</span> <span className="text-purple-300">TechStack</span> <span className="text-purple-300">{'{'}</span></div>
                      <div>  <span className="text-emerald-300">frontend</span><span className="text-rose-300">:</span> <span className="text-purple-300">{'{'}</span></div>
                      <div>    <span className="text-emerald-300">framework</span><span className="text-rose-300">:</span> <span className="text-sky-300">"React 18 + TypeScript"</span><span className="text-gray-400">,</span></div>
                      <div>    <span className="text-emerald-300">styling</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Tailwind CSS v3"</span><span className="text-gray-400">,</span></div>
                      <div>    <span className="text-emerald-300">bundler</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Vite"</span></div>
                      <div>  <span className="text-purple-300">{'}'}</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">libraries</span><span className="text-rose-300">:</span> <span className="text-purple-300">[</span></div>
                      <div>    <span className="text-sky-300">"@dnd-kit"</span><span className="text-gray-400">, // Drag & drop functionality</span></div>
                      <div>    <span className="text-sky-300">"lucide-react"</span><span className="text-gray-400">, // Beautiful icons</span></div>
                      <div>    <span className="text-sky-300">"Google Fonts"</span> <span className="text-gray-400">// Typography</span></div>
                      <div>  <span className="text-purple-300">]</span></div>
                      <div><span className="text-purple-300">{'}'}</span></div>
                      <div className="text-gray-500"></div>

                      <div><span className="text-violet-300">##</span> <span className="text-sky-300 font-semibold">Key Implementations</span></div>
                      <div className="text-gray-500"></div>
                      <div><span className="text-gray-400">// Custom window management system</span></div>
                      <div><span className="text-pink-300">const</span> <span className="text-gray-200">windowFeatures</span> <span className="text-rose-300">=</span> <span className="text-purple-300">{'{'}</span></div>
                      <div>  <span className="text-emerald-300">dragging</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Scroll-aware calculations"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">positioning</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Percentage-based responsive"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">canvas</span><span className="text-rose-300">:</span> <span className="text-sky-300">"200vh scrollable height"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">background</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Fixed gradient system"</span></div>
                      <div><span className="text-purple-300">{'}'}</span><span className="text-gray-400">;</span></div>
                      <div className="text-gray-500"></div>

                      <div><span className="text-gray-400">// Tab system with drag & drop</span></div>
                      <div><span className="text-pink-300">const</span> <span className="text-gray-200">tabSystem</span> <span className="text-rose-300">=</span> <span className="text-purple-300">{'{'}</span></div>
                      <div>  <span className="text-emerald-300">reordering</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Sortable context with @dnd-kit"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">state</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Independent per window"</span><span className="text-gray-400">,</span></div>
                      <div>  <span className="text-emerald-300">design</span><span className="text-rose-300">:</span> <span className="text-sky-300">"Custom built, no imports"</span></div>
                      <div><span className="text-purple-300">{'}'}</span><span className="text-gray-400">;</span></div>
                      <div className="text-gray-500"></div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-1 bg-purple-600 text-xs text-white">
              <div className="flex items-center gap-4">
                <span>✓ React + Tailwind</span>
                <span>⚡ Vite</span>
                <span>🎨 Custom Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Lines: 1000+</span>
                <span>|</span>
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

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