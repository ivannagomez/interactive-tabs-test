import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';

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
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof Element && e.target.closest('.window-controls')) {
      return; // Don't drag if clicking on window controls
    }

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onFocus();
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
      className={`absolute bg-white rounded-lg shadow-2xl overflow-hidden transition-shadow ${
        isActive ? 'shadow-2xl ring-2 ring-blue-500 ring-opacity-50' : 'shadow-xl'
      } ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }}
      onMouseDown={() => onFocus()}
    >
      {/* Window Title Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          isActive ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-700'
        } cursor-grab select-none`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 window-controls">
            <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
          </div>
        </div>

        <span className="text-white text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
          {title}
        </span>

        <div className="flex items-center gap-1 window-controls">
          <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
            <Minimize2 className="w-3 h-3 text-white" />
          </button>
          <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
            <Maximize2 className="w-3 h-3 text-white" />
          </button>
          <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;