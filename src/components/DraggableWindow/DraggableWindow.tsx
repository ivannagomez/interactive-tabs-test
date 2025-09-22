import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import useTabs from '../../hooks/useTabs';
import Tab from '../BrowserTab/Tab';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Tab as TabType } from '../../types';

interface DraggableWindowProps {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isActive: boolean;
  zIndex: number;
  onDrag: (position: { x: number; y: number }) => void;
  onFocus: () => void;
  title: string;
  children: React.ReactNode;
  initialTabs?: TabType[];
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  id,
  position,
  size,
  isActive,
  zIndex,
  onDrag,
  onFocus,
  title,
  children,
  initialTabs,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const {
    tabs,
    activeTabId,
    activeTab,
    addTab,
    closeTab,
    setActiveTab,
    reorderTabs,
  } = useTabs(initialTabs);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTabDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over.id);

      const newTabs = [...tabs];
      const [movedTab] = newTabs.splice(oldIndex, 1);
      newTabs.splice(newIndex, 0, movedTab);

      reorderTabs(newTabs);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't call stopPropagation so parent onMouseDown can also fire

    if (e.target instanceof Element && (e.target.closest('.window-controls') || e.target.closest('.tab-item'))) {
      return; // Don't drag if clicking on window controls or tabs
    }

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Keep window within viewport bounds
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;

        onDrag({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onDrag, size]);

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-xl overflow-hidden ring-1 ring-black/10 ${
        isDragging
          ? 'cursor-grabbing shadow-2xl shadow-black/30 ring-2'
          : isActive
            ? 'shadow-2xl shadow-black/20 transition-shadow duration-300'
            : 'shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }}
      onMouseDown={(e) => {
        // Focus window on any click within it
        onFocus();
      }}
      onClick={(e) => {
        // Also handle click events
        onFocus();
      }}
    >
      {/* Window Title Bar with Tabs */}
      <div
        className={`flex items-center gap-3 px-3 py-2 ${
          isActive
            ? 'bg-gradient-to-b from-slate-50 to-gray-50 border-b border-gray-200'
            : 'bg-gray-100 border-b'
        } cursor-grab select-none`}
        onMouseDown={handleMouseDown}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-2 window-controls">
          <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all hover:scale-110 shadow-sm" />
          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all hover:scale-110 shadow-sm" />
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all hover:scale-110 shadow-sm" />
        </div>

        {/* Tabs */}
        <div className="flex-1 flex items-center overflow-x-auto scrollbar-hide">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleTabDragEnd}
          >
            <SortableContext
              items={tabs.map(tab => tab.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex items-center gap-1 tab-item">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    tab={tab}
                    isActive={tab.id === activeTabId}
                    onClose={closeTab}
                    onClick={setActiveTab}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Add Tab Button */}
          <button
            onClick={addTab}
            className="ml-2 p-1.5 opacity-60 hover:opacity-100 hover:bg-black/10 rounded-md transition-all window-controls"
            aria-label="Add new tab"
          >
            <Plus className="w-4 h-4 text-gray-600" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-hidden">
        {React.cloneElement(children as React.ReactElement, {
          tabs,
          activeTabId,
          activeTab,
        })}
      </div>
    </div>
  );
};

export default DraggableWindow;