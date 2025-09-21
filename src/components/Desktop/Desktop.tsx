import React from 'react';
import DraggableWindow from '../DraggableWindow/DraggableWindow';
import BrowserWindow from '../BrowserWindow/BrowserWindow';
import useWindows from '../../hooks/useWindows';

const Desktop: React.FC = () => {
  const { windows, updateWindowPosition, focusWindow, activeWindowId } = useWindows();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-black bg-opacity-10" />

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
        >
          <BrowserWindow
            initialTabs={window.tabs}
            windowId={window.id}
          />
        </DraggableWindow>
      ))}
    </div>
  );
};

export default Desktop;