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
        relative flex items-center gap-2 px-3 py-2 min-w-[180px] max-w-[240px]
        ${isActive ? 'bg-white' : 'bg-gray-100 hover:bg-gray-50'}
        ${isDragging ? 'opacity-50 z-50' : ''}
        border-r
        cursor-pointer select-none
        transition-all duration-200
        group
      `}
      onClick={handleClick}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        {tab.favicon ? (
          <img src={tab.favicon} alt="" className="w-4 h-4 flex-shrink-0" />
        ) : (
          <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
        )}
        <span className="text-sm truncate text-gray-700">{tab.title}</span>
      </div>
      <button
        onClick={handleClose}
        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-200 rounded transition-opacity duration-200"
        aria-label="Close tab"
      >
        <X className="w-3.5 h-3.5 text-gray-600" />
      </button>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />
      )}
    </div>
  );
};

export default TabComponent;