import { useState, useCallback } from 'react';
import type { Tab } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const useTabs = (initialTabs?: Tab[]) => {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs || [
    {
      id: generateId(),
      title: 'Welcome to Windsurf',
      url: 'windsurf://welcome',
      content: 'Welcome to the Interactive Browser Tabs Demo! This simulates a browser experience with draggable tabs.',
    },
    {
      id: generateId(),
      title: 'Google',
      url: 'https://www.google.com',
      favicon: 'https://www.google.com/favicon.ico',
    },
    {
      id: generateId(),
      title: 'GitHub',
      url: 'https://github.com',
      favicon: 'https://github.com/favicon.ico',
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string | null>(tabs[0]?.id || null);

  const activeTab = tabs.find(tab => tab.id === activeTabId) || null;

  const addTab = useCallback(() => {
    const newTab: Tab = {
      id: generateId(),
      title: 'New Tab',
      url: 'about:blank',
      content: 'Hello friend, I see you poking around!',
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const closeTab = useCallback((id: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== id);

      // If we're closing the active tab, switch to another tab
      if (id === activeTabId && newTabs.length > 0) {
        const closedIndex = prev.findIndex(tab => tab.id === id);
        const newActiveIndex = Math.min(closedIndex, newTabs.length - 1);
        setActiveTabId(newTabs[newActiveIndex].id);
      } else if (newTabs.length === 0) {
        setActiveTabId(null);
      }

      return newTabs;
    });
  }, [activeTabId]);

  const setActiveTab = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  const reorderTabs = useCallback((newTabs: Tab[]) => {
    setTabs(newTabs);
  }, []);

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs(prev => prev.map(tab =>
      tab.id === id ? { ...tab, ...updates } : tab
    ));
  }, []);

  return {
    tabs,
    activeTabId,
    activeTab,
    addTab,
    closeTab,
    setActiveTab,
    reorderTabs,
    updateTab,
  };
};

export default useTabs;