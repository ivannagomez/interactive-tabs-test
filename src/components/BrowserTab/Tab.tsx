import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Globe } from 'lucide-react';
import type { Tab as TabType } from '../../types';

interface TabProps {
  tab: TabType;
  isActive: boolean;
  onClose: (id: string) => void;
  onClick: (id: string) => void;
}

const TabComponent: React.FC<TabProps> = ({ tab, isActive, onClose, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(tab.id);
  };

  const handleClick = () => {
    onClick(tab.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative flex items-center gap-2 pl-3 pr-1 py-1 min-w-[140px] max-w-[240px]
        ${isActive
          ? 'bg-white/95 border border-black/10'
          : 'bg-black/5 hover:bg-black/10 border border-transparent'
        }
        ${isDragging ? 'opacity-60 z-50 shadow-lg' : ''}
        rounded-md
        cursor-pointer select-none
        transition-all duration-150 ease-out
        group
      `}
      onClick={handleClick}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        {tab.favicon ? (
          // Check if favicon is an emoji (single character, not a URL)
          tab.favicon.length === 1 || (tab.favicon.length === 2 && /\p{Emoji}/u.test(tab.favicon)) ? (
            <span className="w-4 h-4 flex-shrink-0 text-xs flex items-center justify-center">{tab.favicon}</span>
          ) : (
            <img src={tab.favicon} alt="" className="w-4 h-4 flex-shrink-0 rounded-sm" />
          )
        ) : (
          <Globe className="w-4 h-4 text-gray-600 flex-shrink-0" />
        )}
        <span className={`text-xs truncate font-medium ${
          isActive ? 'text-gray-900' : 'text-gray-700'
        }`}>
          {tab.title}
        </span>
      </div>
      <button
        onClick={handleClose}
        className={`
          ${isActive ? 'opacity-60' : 'opacity-0'}
          group-hover:opacity-100
          hover:bg-black/10 p-1 rounded-md ml-1
          transition-all duration-150
        `}
        aria-label="Close tab"
      >
        <X className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
      </button>
    </div>
  );
};

export default TabComponent;