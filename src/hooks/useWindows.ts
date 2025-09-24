import { useState, useCallback } from 'react';
import type { Tab } from '../types';

export interface WindowData {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  tabs: Tab[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const useWindows = () => {
  const [windows, setWindows] = useState<WindowData[]>([
    {
      id: generateId(),
      title: 'Windsurf Browser',
      position: { x: window.innerWidth * 0.10, y: window.innerHeight * 0.75 },
      size: { width: 800, height: 600 },
      zIndex: 7,
      tabs: [
        {
          id: generateId(),
          title: 'Hello friend!',
          url: 'http://localhost:1111',
          content: 'Welcome to the Interactive Browser Playground! Explore this React + Tailwind case study.',
        },
        {
          id: generateId(),
          title: 'Google',
          url: 'https://www.google.com',
          favicon: 'https://www.google.com/favicon.ico',
        },
      ],
    },
    {
      id: generateId(),
      title: 'Development Browser',
      position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.5 },
      size: { width: 800, height: 600 },
      zIndex: 5,
      tabs: [
        {
          id: generateId(),
          title: 'GitHub',
          url: 'https://github.com',
          favicon: 'https://github.com/favicon.ico',
          content: 'image:test-3.jpg',
        },
        {
          id: generateId(),
          title: 'Stack Overflow',
          url: 'https://stackoverflow.com',
          favicon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico',
        },
      ],
    },
    {
      id: generateId(),
      title: 'Social Browser',
      position: { x: window.innerWidth * 0.35, y: window.innerHeight * 1.25 },
      size: { width: 800, height: 600 },
      zIndex: 9,
      tabs: [
        {
          id: generateId(),
          title: 'Transition Study',
          url: 'https://www.ivanna-gomez.com/transition-study',
          favicon: '❤️',
          content: 'iframe:https://www.ivanna-gomez.com/transition-study',
        },
      ],
    },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string>(windows[2]?.id || '');

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId ? { ...window, position } : window
    ));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setActiveWindowId(windowId);
    // Bring window to front by giving it the highest z-index
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(window =>
        window.id === windowId
          ? { ...window, zIndex: maxZ + 1 }
          : window
      );
    });
  }, []);

  const addWindow = useCallback(() => {
    const newWindow: WindowData = {
      id: generateId(),
      title: 'New Browser',
      position: { x: Math.random() * 300 + 50, y: Math.random() * 200 + 50 },
      size: { width: 800, height: 600 },
      zIndex: Math.max(...windows.map(w => w.zIndex)) + 1,
      tabs: [
        {
          id: generateId(),
          title: 'New Tab',
          url: 'about:blank',
          content: 'This is a new browser window.',
        },
      ],
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(window => window.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = windows.filter(w => w.id !== windowId);
      setActiveWindowId(remaining[0]?.id || '');
    }
  }, [activeWindowId, windows]);

  return {
    windows,
    activeWindowId,
    updateWindowPosition,
    focusWindow,
    addWindow,
    closeWindow,
  };
};

export default useWindows;