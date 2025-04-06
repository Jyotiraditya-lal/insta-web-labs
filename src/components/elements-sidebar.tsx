import React from "react";
import DraggableElement from "./dragable-element"; // ✅ this will now work
import { Heading, ImageIcon, Square, AlignLeft } from "lucide-react";
import type { ElementType } from "../lib/types";

interface ElementsSidebarProps {
  onAddElement: (type: ElementType, x: number, y: number) => void;
}

const ElementsSidebar: React.FC<ElementsSidebarProps> = ({ onAddElement }) => {
  const elements = [
    { type: "heading", label: "Heading", icon: <Heading /> },
    { type: "paragraph", label: "Paragraph", icon: <AlignLeft /> },
    { type: "button", label: "Button", icon: <Square /> },
    { type: "image", label: "Image", icon: <ImageIcon /> },
  ];

  return (
    <div className="elements-sidebar-content">
      {elements.map((el) => (
        <DraggableElement
          key={el.type}
          type={el.type as ElementType}
          icon={el.icon}
          label={el.label}
        />
      ))}
    </div>
  );
};

export default ElementsSidebar;
