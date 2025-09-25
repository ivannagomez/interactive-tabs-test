import React, { useState } from 'react';
import type { Tab } from '../../types';
import { Globe, Github, Twitter, Code2, Search, FileText, Folder, FolderOpen, Coffee } from 'lucide-react';
import dino1 from '../../assets/dino-1.png';
import dino2 from '../../assets/dino-2.png';
import dino3 from '../../assets/dino-3.png';
import penguinAnimation from '../../assets/penguin-animation.mp4';

// Standalone DinosaurGallery component for state persistence
const DinosaurGallery: React.FC = () => {
  const [selectedDino, setSelectedDino] = useState(0);

  const dinosaurs = [
    {
      image: dino1,
      name: 'Dino 1',
      title: 'triceratop',
      poem: 'Ancient guardian of the plains,\nWith proud horns that gleam like gold.\nIn meadows where the sunlight reigns,\nYour gentle heart beats strong and bold.'
    },
    {
      image: dino2,
      name: 'Dino 2',
      title: 'parasaurolophus',
      poem: 'Songs echo through primeval trees,\nYour crest calls out across the land.\nA melody upon the breeze,\nNature\'s own enchanted band.'
    },
    {
      image: dino3,
      name: 'Dino 3',
      title: 'stegosaurs',
      poem: 'Plates of armor catch the light,\nA crown of spikes upon your tail.\nGentle giant, peaceful might,\nThrough ancient times your legends sail.'
    }
  ];

  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${dinosaurs[selectedDino].image})`, height: '95%' }}
    >
      {/* Frosted Glass Menu */}
      <div className="absolute top-8 right-4 flex gap-2 p-3 rounded-xl backdrop-blur-md border shadow-lg" style={{ backgroundColor: 'rgba(214, 162, 176, 0.3)', borderColor: 'rgba(214, 162, 176, 0.5)' }}>
        {dinosaurs.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              console.log(`Clicked dino ${index}`); // Debug log
              setSelectedDino(index);
            }}
            className={`w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
              selectedDino === index
                ? 'shadow-md scale-110'
                : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: selectedDino === index
                ? 'rgba(214, 162, 176, 0.6)'
                : 'rgba(214, 162, 176, 0.2)',
            }}
            onMouseEnter={(e) => {
              if (selectedDino !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(214, 162, 176, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedDino !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(214, 162, 176, 0.2)';
              }
            }}
          >
            {/* Simple geometric SVG icons */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ color: '#dbc5c6' }}>
              {index === 0 && (
                // Circle for Dino 1
                <circle cx="8" cy="8" r="6" />
              )}
              {index === 1 && (
                // Triangle for Dino 2
                <path d="M8 2 L14 14 L2 14 Z" />
              )}
              {index === 2 && (
                // Square for Dino 3
                <rect x="2" y="2" width="12" height="12" />
              )}
            </svg>
          </button>
        ))}
      </div>

      {/* Typography Overlay */}
      <div className="absolute top-8 left-8 max-w-md">
        <h1
          className="text-6xl mb-4 transition-all duration-300 ease-out"
          style={{
            fontFamily: 'Yipes, sans-serif',
            color: '#d6a2b0',
            letterSpacing: '-0.05em',
          }}
        >
          {dinosaurs[selectedDino].title}
        </h1>
        <p
          className="text-md leading-relaxed transition-all duration-300 ease-out whitespace-pre-line"
          style={{
            fontFamily: 'IBM Plex Mono',
            lineHeight: '1.2',
            color: '#d6a2b0',
          }}
        >
          {dinosaurs[selectedDino].poem}
        </p>
      </div>
    </div>
  );
};

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

    // Check if content specifies dinosaur gallery
    if (activeTab.content === 'dinosaur-gallery') {
      return <DinosaurGallery />;
    }

    // Check if content specifies a video
    if (activeTab.content?.startsWith('video:')) {
      return (
        <div className="flex-1 h-full" style={{ backgroundColor: '#ffdac3' }}>
          <div className="p-8 h-full flex items-start justify-center">
            <video
              src={penguinAnimation}
              className="max-w-full rounded-lg"
              style={{ height: '89%', border: '3px solid #faaea9' }}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      );
    }

    // Check if content specifies an iframe
    if (activeTab.content?.startsWith('iframe:')) {
      const iframeUrl = activeTab.content.replace('iframe:', '');
      return (
        <div className="flex-1 bg-white h-full">
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title={activeTab.title}
            loading="lazy"
          />
        </div>
      );
    }

    // Check if content specifies an image (deprecated - using specific handlers now)

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
        <div className="p-8 bg-gray-900 text-white h-full">
          <div className="flex items-center gap-3 mb-6">
            <Github className="w-10 h-10" />
            <h1 className="text-3xl font-bold">GitHub</h1>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300">Welcome to GitHub - where code comes to life.</p>
            <p className="text-gray-400">This is a demo implementation of GitHub's interface.</p>
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
        <div className="bg-white h-full overflow-auto">
          {/* Google Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <h1 className="text-2xl font-normal mr-8">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </h1>
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
                <input
                  type="text"
                  className="flex-1 outline-none text-sm"
                  value="who is the best engineer ever ever ever?"
                  readOnly
                />
                <Search className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="p-4 max-w-2xl">
            {/* Search Stats */}
            <div className="text-sm text-gray-600 mb-4">
              About 847,000 results (0.43 seconds)
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* First Result - Ivanna Gomez */}
              <div>
                <div className="text-sm text-green-700">https://ivanna-gomez.com</div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  Ivanna Gomez - The Best Engineer Ever Ever Ever
                </h3>
                <p className="text-sm text-gray-600">
                  Ivanna Gomez is undoubtedly the best engineer ever ever ever. With her incredible software engineering skills, and creating stunning interactive experiences, she's revolutionized...
                </p>
              </div>

              {/* Second Result */}
              <div>
                <div className="text-sm text-green-700">https://engineering-legends.com/ivanna</div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  Engineering Hall of Fame: Ivanna Gomez Is Awesome
                </h3>
                <p className="text-sm text-gray-600">
                  Breaking: Local engineer Ivanna Gomez has been officially recognized as the best engineer ever ever ever. Her mastery of modern web technologies and eye for design...
                </p>
              </div>

              {/* Third Result */}
              <div>
                <div className="text-sm text-green-700">https://stackoverflow.com/questions/best-engineer</div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  Who is the best engineer ever? - Stack Overflow
                </h3>
                <p className="text-sm text-gray-600">
                  Accepted Answer: Ivanna Gomez, hands down. Her code is clean, her designs are beautiful, and her problem-solving skills are legendary. 847 upvotes • Best Answer
                </p>
              </div>

              {/* Fourth Result */}
              <div>
                <div className="text-sm text-green-700">https://github.com/ivannagomez</div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  Ivanna Gomez (@ivannagomez) · GitHub
                </h3>
                <p className="text-sm text-gray-600">
                  The repository of the best engineer ever ever ever. Check out her incredible projects, from interactive browser playgrounds to stunning web experiences. ⭐ 10k stars
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default content for other sites
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          {/* {activeTab.favicon ? (
            <img src={activeTab.favicon} alt="" className="w-8 h-8" />
          ) : (
            <Globe className="w-8 h-8 text-gray-500" />
          )} */}
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