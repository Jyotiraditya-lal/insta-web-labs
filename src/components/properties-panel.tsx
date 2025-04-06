"use client";

import { useState, useEffect } from "react";
import { Settings } from 'lucide-react';
import { Element } from "../lib/types";
import "./properties-panel.css";

interface PropertiesPanelProps {
  element: Element | undefined;
  onUpdateProperties: (properties: Record<string, any>) => void;
}

export default function PropertiesPanel({ element, onUpdateProperties }: PropertiesPanelProps) {
  const [localContent, setLocalContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("content");
  
  useEffect(() => {
    if (element) {
      setLocalContent(element.content || "");
    }
  }, [element]);

  if (!element) {
    return (
      <div className="empty-properties">
        <Settings className="empty-icon" />
        <p>Select an element to edit its properties</p>
      </div>
    );
  }

  const handleContentChange = (value: string) => {
    setLocalContent(value);
  };

  const handleContentBlur = () => {
    if (element) {
      onUpdateProperties({ content: localContent });
    }
  };

  const handlePropertyChange = (key: string, value: any) => {
    onUpdateProperties({ [key]: value });
  };

  return (
    <div className="properties-panel-content">
      <h2 className="sidebar-title">
        <Settings className="sidebar-icon" /> Properties
      </h2>
      
      <div className="properties-tabs">
        <div className="tabs-list">
          <button 
            className={`tab-button ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button 
            className={`tab-button ${activeTab === "style" ? "active" : ""}`}
            onClick={() => setActiveTab("style")}
          >
            Style
          </button>
          <button 
            className={`tab-button ${activeTab === "advanced" ? "active" : ""}`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === "content" && (
            <div className="content-tab">
              <div className="form-group">
                <label htmlFor="element-content">Content</label>
                {element.type === "paragraph" ? (
                  <textarea
                    id="element-content"
                    value={localContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    onBlur={handleContentBlur}
                    rows={5}
                    className="textarea"
                  />
                ) : (
                  <input
                    id="element-content"
                    type="text"
                    value={localContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    onBlur={handleContentBlur}
                    className="input"
                  />
                )}
              </div>
              
              {element.type === "image" && (
                <>
                  <div className="form-group">
                    <label htmlFor="image-alt">Alt Text</label>
                    <input
                      id="image-alt"
                      type="text"
                      value={element.properties?.alt || ""}
                      onChange={(e) => handlePropertyChange("alt", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image-src">Image URL</label>
                    <input
                      id="image-src"
                      type="text"
                      value={element.properties?.src || ""}
                      onChange={(e) => handlePropertyChange("src", e.target.value)}
                      className="input"
                    />
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === "style" && (
            <div className="style-tab">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="font-size">Font Size</label>
                  <select 
                    id="font-size"
                    value={element.properties?.fontSize || "16px"}
                    onChange={(e) => handlePropertyChange("fontSize", e.target.value)}
                    className="select"
                  >
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="32px">32px</option>
                    <option value="48px">48px</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="text-color">Text Color</label>
                  <div className="color-input-group">
                    <input
                      id="text-color-picker"
                      type="color"
                      value={element.properties?.color || "#000000"}
                      onChange={(e) => handlePropertyChange("color", e.target.value)}
                      className="color-picker"
                    />
                    <input
                      id="text-color"
                      type="text"
                      value={element.properties?.color || "#000000"}
                      onChange={(e) => handlePropertyChange("color", e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              
              {(element.type === "button" || element.type === "container") && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bg-color">Background</label>
                    <div className="color-input-group">
                      <input
                        id="bg-color-picker"
                        type="color"
                        value={element.properties?.backgroundColor || "#3b82f6"}
                        onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
                        className="color-picker"
                      />
                      <input
                        id="bg-color"
                        type="text"
                        value={element.properties?.backgroundColor || "#3b82f6"}
                        onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="border-radius">Border Radius</label>
                    <select 
                      id="border-radius"
                      value={element.properties?.borderRadius || "4px"}
                      onChange={(e) => handlePropertyChange("borderRadius", e.target.value)}
                      className="select"
                    >
                      <option value="0px">None</option>
                      <option value="4px">Small</option>
                      <option value="8px">Medium</option>
                      <option value="16px">Large</option>
                      <option value="9999px">Full</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "advanced" && (
            <div className="advanced-tab">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="element-width">Width (px)</label>
                  <input
                    id="element-width"
                    type="number"
                    value={element.width}
                    onChange={(e) => onUpdateProperties({ width: parseInt(e.target.value) || 0 })}
                    className="input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="element-height">Height (px)</label>
                  <input
                    id="element-height"
                    type="number"
                    value={element.height}
                    onChange={(e) => onUpdateProperties({ height: parseInt(e.target.value) || 0 })}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="element-x">X Position (px)</label>
                  <input
                    id="element-x"
                    type="number"
                    value={element.x}
                    onChange={(e) => onUpdateProperties({ x: parseInt(e.target.value) || 0 })}
                    className="input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="element-y">Y Position (px)</label>
                  <input
                    id="element-y"
                    type="number"
                    value={element.y}
                    onChange={(e) => onUpdateProperties({ y: parseInt(e.target.value) || 0 })}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
