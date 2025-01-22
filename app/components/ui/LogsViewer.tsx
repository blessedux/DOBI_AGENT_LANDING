"use client";

import React, { useState, useEffect, useRef } from "react";

interface LogEntry {
  timestamp: string;
  level: "INFO" | "DEBUG" | "WARNING" | "ERROR";
  message: string;
}

export default function LogsViewer() {
  const [height, setHeight] = useState(120);
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs are added
  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Simulate incoming logs
  useEffect(() => {
    const mockLogs = [
      { level: "INFO", message: "DOBI Agent initialized successfully" },
      { level: "DEBUG", message: "Connecting to cloud computing services..." },
      { level: "INFO", message: "Validating off-chain data using secure multi-party computation" },
      { level: "DEBUG", message: "Processing transaction data from EV charger CHG-001" },
      { level: "INFO", message: "Implementing homomorphic encryption for data validation" },
      { level: "WARNING", message: "Network latency detected in cloud computing operations" },
      { level: "DEBUG", message: "Optimizing system performance for faster validation" },
      { level: "INFO", message: "Exploring new methods for IoT device integration" },
      { level: "ERROR", message: "Failed to connect to Twitter API endpoint" },
      { level: "INFO", message: "Implementing AI-based data validation protocols" },
    ];

    let index = 0;
    const addLog = () => {
      const now = new Date();
      setLogs(prev => [...prev, {
        timestamp: now.toISOString(),
        level: mockLogs[index].level as "INFO" | "DEBUG" | "WARNING" | "ERROR",
        message: mockLogs[index].message
      }]);
      
      index = (index + 1) % mockLogs.length;
    };

    const interval = setInterval(addLog, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle drag to resize
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (e: MouseEvent) => {
      const newHeight = Math.max(100, Math.min(window.innerHeight - 50, startHeight - (e.clientY - startY)));
      setHeight(newHeight);
      setIsExpanded(newHeight > window.innerHeight * 0.5);
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
      setHeight(120);
      setIsExpanded(false);
    } else {
      setHeight(window.innerHeight * 0.7);
      setIsExpanded(true);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-white bg-opacity-40 backdrop-blur-sm border-t border-gray-700 flex flex-col transition-all duration-300"
      style={{ height: `${height}px` }}
    >
      {/* Drag Handle */}
      <div
        className="cursor-row-resize bg-gray-800 bg-opacity-60 text-center p-2 text-sm hover:bg-gray-700 transition select-none flex items-center justify-between px-4"
        onMouseDown={startResizing}
        onClick={toggleExpand}
      >
        <span>{isExpanded ? "▼ Collapse Logs" : "▲ Expand Logs"}</span>
        <span className="text-xs text-gray-400">DOBI Agent Logs</span>
      </div>

      {/* Logs Content */}
      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span className={`ml-2 ${
              log.level === "ERROR" ? "text-red-400" :
              log.level === "WARNING" ? "text-yellow-400" :
              log.level === "DEBUG" ? "text-blue-400" :
              "text-green-400"
            }`}>
              [{log.level}]
            </span>
            <span className="ml-2 text-gray-200">{log.message}</span>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}