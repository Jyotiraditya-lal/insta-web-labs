"use client"

import React, { useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import type { Element, ElementType } from "../lib/types";
import { Trash2 } from "lucide-react";
import "./canvas.css";

interface CanvasProps {
  elements: Element[];
  selectedElementId: string | null;
  viewMode: "desktop" | "tablet" | "mobile";
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
  onDeleteElement: (id: string) => void;
  onAddElement: (type: ElementType, x: number, y: number) => void;
}

export default function Canvas({
  elements,
  selectedElementId,
  viewMode,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
}: CanvasProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: (item: { type: ElementType }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const canvasRect = document.getElementById("canvas-container")?.getBoundingClientRect();
        if (canvasRect) {
          const x = offset.x - canvasRect.left;
          const y = offset.y - canvasRect.top;
          onAddElement(item.type, x, y);
        }
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement>(null); // Create a ref

  // Use the ref in the drop function
  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current); // Call drop with the current ref
    }
  }, [drop]);

  // Handle element dragging within the canvas
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    onSelectElement(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const element = elements.find((el) => el.id === id);

    if (element) {
      const canvasRect = document.getElementById("canvas-container")?.getBoundingClientRect();
      if (canvasRect) {
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;
        onUpdateElement(id, { x, y });
      }
    }
  };

  // Get canvas width based on view mode
  const getCanvasWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
        return "100%";
      default:
        return "100%";
    }
  };

  return (
    <div
      id="canvas-container"
      ref={dropRef} // Set the ref here
      className={`canvas ${isOver ? "canvas-drop-active" : ""}`}
      style={{ width: getCanvasWidth() }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectElement(null);
        }
      }}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          className={`canvas-element ${selectedElementId === element.id ? "selected" : ""}`}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${element.width}px`,
            height: `${element.height}px`,
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, element.id)}
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement(element.id);
          }}
        >
          {renderElement(element)}

          {selectedElementId === element.id && (
            <div className="element-controls">
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteElement(element.id);
                }}
              >
                <Trash2 className="delete-icon" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function renderElement(element: Element) {
  const { type, content, properties } = element;

  switch (type) {
    case "heading":
      return (
        <h2
          style={{
            fontSize: properties?.fontSize || "24px",
            fontWeight: properties?.fontWeight || "bold",
            color: properties?.color || "black",
          }}
        >
          {content}
        </h2>
      );

    case "paragraph":
      return (
        <p
          style={{
            fontSize: properties?.fontSize || "16px",
            color: properties?.color || "black",
          }}
        >
          {content}
        </p>
      );

    case "button":
      return (
        <button
          style={{
            backgroundColor: properties?.backgroundColor || "#3b82f6",
            color: properties?.color || "white",
            borderRadius: properties?.borderRadius || "4px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        >
          {content}
        </button>
      );

    case "image":
      return (
        <div className="image-container">
          <img
            src={properties?.src || "/placeholder.svg?height=200&width=200"}
            alt={properties?.alt || "Image"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      );

    case "container":
      return (
        <div
          style={{
            backgroundColor: properties?.backgroundColor || "transparent",
            border: properties?.border || "1px dashed #ccc",
            borderRadius: properties?.borderRadius || "4px",
            width: "100%",
            height: "100%",
          }}
        >
          {content || "Container"}
        </div>
      );

    default:
      return <div>Unknown element type</div>;
  }
}