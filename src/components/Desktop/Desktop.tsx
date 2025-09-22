import React from 'react';
import DraggableWindow from '../DraggableWindow/DraggableWindow';
import BrowserWindow from '../BrowserWindow/BrowserWindow';
import useWindows from '../../hooks/useWindows';

const Desktop: React.FC = () => {
  const { windows, updateWindowPosition, focusWindow, activeWindowId } = useWindows();

  return (
    <div className="relative w-full min-h-[200vh]" style={{ backgroundColor: 'rgb(248, 245, 234)' }}>
      {/* Header Hero Section */}
      <header className="relative z-[3] px-8 pt-36 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-bold mb-6 tracking-tight font-instrument-serif text-8xl" style={{ color: '#251075' }}>
            Interactive Browser Playground
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-6 font-inter" style={{ color: '#251075' }}>
            This is a case study that I decided to create to get more comfortable with React + Tailwind.
          </p>
          {/* <p className="text-xl text-black/70 max-w-2xl mx-auto leading-6">
            This is a case study that I used to get more comfortable with React + Tailwind. 
            Main goals included achieving clean browser-like styling as well as smooth and interactive draggable browser-like windows.
            Feel free to poke I left some easter eggs!
          </p> */}
        </div>
      </header>

      {/* Gradient Background System - Fixed for Static Scroll */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <img
          src="/src/assets/gradient-1.png"
          alt=""
          className="absolute opacity-50 z-[1]"
          style={{
            transform: 'translate3d(-3%, 23%, 0px)',
            width: '75vw',
            maxWidth: '1220px'
          }}
        />
        <img
          src="/src/assets/gradient-2.png"
          alt=""
          className="absolute opacity-50 z-[1]"
          style={{
            transform: 'translate3d(45%, -7%, 0px)',
            width: '75vw',
            maxWidth: '1220px'
          }}
        />
        {/* Gradient Filter Overlay */}
        <div
          className="absolute"
          style={{
            backgroundImage: 'linear-gradient(#f9ecff, #b3cafc)',
            position: 'absolute',
            top: '0%',
            bottom: '0%',
            left: '0%',
            right: '0%'
          }}
        />
      </div>

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