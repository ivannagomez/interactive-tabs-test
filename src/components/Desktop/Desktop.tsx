import React from 'react';
import DraggableWindow from '../DraggableWindow/DraggableWindow';
import BrowserWindow from '../BrowserWindow/BrowserWindow';
import useWindows from '../../hooks/useWindows';

const Desktop: React.FC = () => {
  const { windows, updateWindowPosition, focusWindow, activeWindowId } = useWindows();

  return (
    <div className="relative w-full min-h-screen" style={{ backgroundColor: 'rgb(248, 245, 234)' }}>
      {/* Header Hero Section */}
      <header className="relative z-0 px-8 pt-12 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-bold text-black mb-4 tracking-tight font-instrument-serif text-8xl">
            Interactive Browser Playground
          </h1>
          <p className="text-xl text-black/70 max-w-2xl mx-auto leading-6">
            This is a case study that I used to get more comfortable with React + Tailwind.
          </p>
          {/* <p className="text-xl text-black/70 max-w-2xl mx-auto leading-6">
            This is a case study that I used to get more comfortable with React + Tailwind. 
            Main goals included achieving clean browser-like styling as well as smooth and interactive draggable browser-like windows.
            Feel free to poke I left some easter eggs!
          </p> */}
        </div>
      </header>

      {/* Decorative Gradient Rectangle */}
      <div className="absolute top-32 right-16 w-64 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-60 blur-sm -z-0" />
      <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-tr from-orange-400 via-red-400 to-pink-400 rounded-full opacity-40 blur-md -z-0" />

      {/* Windows */}
      {windows.map((window) => (
        <DraggableWindow
          key={window.id}
          id={window.id}
          position={window.position}
          size={window.size}
          isActive={window.id === activeWindowId}
          zIndex={window.zIndex}
          onDrag={(position) => updateWindowPosition(window.id, position)}
          onFocus={() => focusWindow(window.id)}
          title={window.title}
          initialTabs={window.tabs}
        >
          <BrowserWindow />
        </DraggableWindow>
      ))}
    </div>
  );
};

export default Desktop;