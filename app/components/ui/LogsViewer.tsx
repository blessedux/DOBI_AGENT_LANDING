"use client";

import React, { useState } from "react";

export default function LogsViewer() {
  const [height, setHeight] = useState(120); // Default small height
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle drag to resize
  const startResizing = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (e) => {
      const newHeight = Math.max(100, Math.min(window.innerHeight - 50, startHeight - (e.clientY - startY)));
      setHeight(newHeight);
      setIsExpanded(newHeight > window.innerHeight * 0.5); // Automatically toggle expanded state
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Handle click to expand/collapse
  const toggleExpand = () => {
    if (isExpanded) {
      setHeight(120); // Collapse to default height
      setIsExpanded(false);
    } else {
      setHeight(window.innerHeight * 0.7); // Expand to 70% of the screen height
      setIsExpanded(true);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-40 backdrop-blur-sm border-t border-gray-700 flex flex-col transition-all duration-300"
      style={{ height: `${height}px` }}
    >
      {/* Drag Handle (Now Clickable) */}
      <div
        className="cursor-row-resize bg-gray-800 bg-opacity-60 text-center p-2 text-sm hover:bg-gray-700 transition select-none"
        onMouseDown={startResizing}
        onClick={toggleExpand} // Click to expand/collapse
      >
        {isExpanded ? "▼ Collapse Logs" : "▲ Expand Logs"}
      </div>

      {/* Logs Content */}
      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono text-gray-200">
        <p>Logs Viewer Initialized...</p>
        <p>[INFO] Dobi Agent processing transactions...</p>
        <p>[DEBUG] AI system analyzing charger data...</p>
      </div>
    </div>
  );
}