import React from 'react';
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
import { Plus } from 'lucide-react';
import Tab from './Tab';
import type { Tab as TabType } from '../../types';

interface TabBarProps {
  tabs: TabType[];
  activeTabId: string | null;
  onTabClose: (id: string) => void;
  onTabClick: (id: string) => void;
  onTabReorder: (tabs: TabType[]) => void;
  onNewTab: () => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onTabClose,
  onTabClick,
  onTabReorder,
  onNewTab,
}) => {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over.id);

      const newTabs = [...tabs];
      const [movedTab] = newTabs.splice(oldIndex, 1);
      newTabs.splice(newIndex, 0, movedTab);

      onTabReorder(newTabs);
    }
  };

  return (
    <div className="flex items-center bg-gray-200 border-b border-gray-300">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tabs.map(tab => tab.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex items-center flex-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTabId}
                onClose={onTabClose}
                onClick={onTabClick}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button
        onClick={onNewTab}
        className="p-2 mx-2 hover:bg-gray-300 rounded transition-colors duration-200"
        aria-label="Add new tab"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default TabBar;