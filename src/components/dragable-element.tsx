import React, { forwardRef } from "react";
import { useDrag } from "react-dnd";
import type { ElementType } from "../lib/types";

interface DraggableElementProps {
  type: ElementType;
  icon: React.ReactNode;
  label: string;
}

const DraggableElement = forwardRef<HTMLDivElement, DraggableElementProps>(
  ({ type, icon, label }, ref) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "element",
      item: { type },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const dragRef = (node: HTMLDivElement | null) => {
      drag(node);
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    };

    return (
      <div ref={dragRef} className={`draggable-element ${isDragging ? "dragging" : ""}`}>
        <div className="element-icon">{icon}</div>
        <span>{label}</span>
      </div>
    );
  }
);

DraggableElement.displayName = "DraggableElement";

export default DraggableElement;
