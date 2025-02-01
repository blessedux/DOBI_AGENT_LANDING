"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLogs } from '../../hooks/useLogs';
import { formatDistanceToNow } from 'date-fns';
import { TransactionLog } from '../../types/logs';

// Helper function to safely format timestamp
const formatTimestamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid date';
  }
};

// Helper function to safely format status
const formatStatus = (status: string | undefined) => {
  if (!status) return 'UNKNOWN';
  return status.toUpperCase();
};

// Helper function to get status color
const getStatusColor = (status: string | undefined) => {
  if (!status) return 'text-gray-400';
  switch (status.toLowerCase()) {
    case 'completed':
      return 'text-green-400';
    case 'pending':
      return 'text-yellow-400';
    case 'failed':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const LogEntry = ({ log }: { log: TransactionLog }) => {
  const [showRawData, setShowRawData] = useState(false);

  // Helper function to format the think content
  const formatThinkContent = (rawResponse: any) => {
    if (!rawResponse) return null;
    
    // Try different paths to find THINK content
    const possibleThinkContent = [
      rawResponse.data?.raw_response,
      rawResponse.data?.think_process,
      rawResponse.raw_response,
      typeof rawResponse === 'string' ? rawResponse : null
    ].find(content => content && typeof content === 'string');

    if (possibleThinkContent) {
      const thinkMatch = possibleThinkContent.match(/<THINK>\n([\s\S]*?)<\/THINK>/);
      return thinkMatch ? thinkMatch[1].trim() : possibleThinkContent;
    }

    return null;
  };

  // Get think content
  const thinkContent = formatThinkContent(log.raw_response);
  
  return (
    <div className="mb-3 hover:bg-white/5 p-2 rounded border border-gray-800/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">
            {formatTimestamp(log.timestamp)}
          </span>
          <span className={`${getStatusColor(log.status)}`}>
            [{formatStatus(log.status)}]
          </span>
          <span className="text-blue-400">
            {log.network || 'unknown-network'}
          </span>
          <span className="text-gray-200">
            {log.amount || '0'} ETH from {log.sender ? 
              `${log.sender.slice(0, 6)}...${log.sender.slice(-4)}` : 
              'unknown-sender'}
          </span>
          <span className="text-gray-500">
            tx: {log.txHash ? 
              `${log.txHash.slice(0, 8)}...${log.txHash.slice(-6)}` : 
              'unknown-hash'}
          </span>
        </div>
        <button
          onClick={() => setShowRawData(!showRawData)}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            showRawData 
              ? 'bg-blue-500/10 text-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {showRawData ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      {/* Always show THINK content if available */}
      {thinkContent && (
        <div className="mt-3 pl-4 border-l-2 border-gray-700">
          <div className="bg-gray-800/50 rounded p-3 mb-2">
            <div className="text-yellow-400 mb-1 text-xs font-bold">THINK Process:</div>
            <pre className="text-gray-300 whitespace-pre-wrap text-xs leading-relaxed">
              {thinkContent}
            </pre>
          </div>
        </div>
      )}
      
      {/* Show additional details when expanded */}
      {showRawData && log.raw_response && (
        <div className="mt-3 pl-4 border-l-2 border-gray-700">
          {/* Message Type */}
          <div className="text-gray-400 mb-2">
            <span className="text-blue-400">Type:</span> {log.raw_response.message}
          </div>

          {/* Final Decision or Other Data */}
          {log.raw_response.data?.final_decision && (
            <div className="text-gray-400">
              <span className="text-green-400">Decision:</span> {log.raw_response.data.final_decision}
            </div>
          )}

          {/* Contract Address and Status */}
          {log.raw_response.data?.["contract address"] && (
            <div className="text-gray-400 mt-2">
              <div>
                <span className="text-blue-400">Contract:</span> {log.raw_response.data["contract address"]}
              </div>
              <div>
                <span className="text-blue-400">Status:</span> {log.raw_response.data.status}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function LogsViewer() {
  const [height, setHeight] = useState(120);
  const [isExpanded, setIsExpanded] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const { logs, loading, error } = useLogs();

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (!isExpanded) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isExpanded]);

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

  // Handle drag to resize
  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    
    const startY = mouseDownEvent.clientY;
    const startHeight = height;

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newHeight = Math.max(120, Math.min(window.innerHeight - 50, 
        startHeight - (mouseMoveEvent.clientY - startY)
      ));
      setHeight(newHeight);
      setIsExpanded(newHeight > 120);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const renderError = (error: string) => {
    return (
      <div className="p-4">
        <div className="text-red-400 font-mono">
          <span className="text-yellow-400">[ERROR]</span> {error}
        </div>
        <div className="mt-2 text-gray-400 text-xs">
          Please check:
          <ul className="list-disc list-inside mt-1">
            <li>API key configuration in environment variables</li>
            <li>Network connectivity to DOBI Mantle</li>
            <li>API key permissions and validity</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-white bg-opacity-40 backdrop-blur-sm border-t border-gray-700 flex flex-col transition-all duration-300 z-20"
      style={{ height: `${height}px` }}
    >
      <div
        className="cursor-row-resize bg-gray-800 bg-opacity-60 text-center p-2 text-sm hover:bg-gray-700 transition select-none flex items-center justify-between px-4"
        onMouseDown={startResizing}
        onClick={toggleExpand}
      >
        <span>{isExpanded ? "▼ Collapse Logs" : "▲ Expand Logs"}</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">DOBI Smart Contract Logs</span>
          {loading && <span className="text-xs text-yellow-400 animate-pulse">Syncing...</span>}
          {error && <span className="text-xs text-red-400">Connection Error</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
        {error ? (
          renderError(error)
        ) : (
          logs.map((log) => (
            <LogEntry key={log.txHash || Math.random()} log={log} />
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}