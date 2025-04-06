import React, { useState } from "react";
import Canvas from "./components/canvas";
import ElementsSidebar from "./components/elements-sidebar";
import type { Element, ElementType } from "./lib/types";
import { v4 as uuidv4 } from "uuid"; // Make sure to install this: `npm install uuid`

export default function App() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const handleAddElement = (type: ElementType, x: number, y: number) => {
    const newElement: Element = {
      id: uuidv4(),
      type,
      x,
      y,
      width: 200,
      height: 80,
      content: type === "heading" ? "Heading Text" :
               type === "paragraph" ? "Paragraph text" :
               type === "button" ? "Click Me" :
               "",
      properties: {},
    };

    setElements((prev) => [...prev, newElement]);
  };

  const handleUpdateElement = (id: string, updates: Partial<Element>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const handleDeleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div className="app-layout">
      <ElementsSidebar onAddElement={handleAddElement} />
      <Canvas
        elements={elements}
        selectedElementId={selectedElementId}
        viewMode="desktop"
        onSelectElement={setSelectedElementId}
        onUpdateElement={handleUpdateElement}
        onDeleteElement={handleDeleteElement}
        onAddElement={handleAddElement} // <-- Make sure this is set!
      />
    </div>
  );
}
