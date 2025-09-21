export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive?: boolean;
  content?: string;
}

export interface BrowserState {
  tabs: Tab[];
  activeTabId: string | null;
}