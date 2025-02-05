"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLogs } from '../../hooks/useLogs';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { TransactionLog } from '../../types/logs';

// Helper function to safely format timestamp
const formatTimestamp = (timestamp: string) => {
  try {
    const date = parseISO(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    // Format as HH:mm:ss
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
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

const LogEntry = ({ log, isNew }: { log: TransactionLog; isNew?: boolean }) => {
  const [showRawData, setShowRawData] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const toggleLogDetails = (logId: string) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

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
  
  const isExpanded = expandedLogs.has(log.txHash);
  
  return (
    <div className={`mb-3 p-2 rounded border border-gray-800/20 transition-all duration-500 
      ${isNew ? 'bg-blue-500/10 animate-pulse' : 'hover:bg-white/5'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-white-400">
            {formatTimestamp(log.timestamp)}
          </span>
          <span className={`${getStatusColor(log.status)}`}>
            [{formatStatus(log.status)}]
          </span>
          <span className="text-blue-400">
            {log.network || 'unknown-network'}
          </span>
          <span className="text-white-200">
            {log.amount || '0'} ETH from {log.sender ? 
              `${log.sender.slice(0, 6)}...${log.sender.slice(-4)}` : 
              'unknown-sender'}
          </span>
          <a
            href={`https://explorer.mantle.xyz/tx/${log.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {log.txHash ? 
              `${log.txHash.slice(0, 8)}...${log.txHash.slice(-6)}` : 
              'unknown-hash'}
          </a>
        </div>
        <button
          onClick={() => toggleLogDetails(log.txHash)}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            isExpanded 
              ? 'bg-blue-500/10 text-red-400' 
              : 'text-white-400 hover:text-white'
          }`}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
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
      {isExpanded && log.raw_response && (
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
  const { logs, loading, error, refresh } = useLogs();
  const [height, setHeight] = useState(40);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(120);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [showRawData, setShowRawData] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [previousLogsLength, setPreviousLogsLength] = useState(0);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const toggleExpand = () => {
    if (isExpanded) {
      setHeight(40);
      setIsExpanded(false);
    } else {
      setHeight(400);
      setIsExpanded(true);
    }
  };

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

  const toggleLogDetails = (logId: string) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  const renderError = (error: Error | string) => {
    const errorMessage = error instanceof Error ? error.message : error;
    return (
      <div className="p-4">
        <div className="text-red-400 font-mono">
          <span className="text-yellow-400">[ERROR]</span> {errorMessage}
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

  // Check for new logs and print them
  useEffect(() => {
    if (logs.length > previousLogsLength) {
      const newLogs = logs.slice(previousLogsLength);
      
      // Print new logs to console
      console.group(`🔵 New Logs Received (${newLogs.length})`);
      newLogs.forEach(log => {
        console.log(
          `%c${formatTimestamp(log.timestamp)} | ${log.network} | ${log.status}`,
          'color: #4CAF50; font-weight: bold'
        );
        if (log.raw_response) {
          console.log('📝 Details:', log.raw_response);
        }
      });
      console.groupEnd();
      
      // Auto-scroll to bottom for new logs
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setLastUpdateTime(new Date());
      setPreviousLogsLength(logs.length);
    }
  }, [logs, previousLogsLength]);

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-white bg-opacity-40 backdrop-blur-sm border-t border-gray-700 flex flex-col transition-all duration-300 z-30"
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
          {!loading && <span className="text-xs text-gray-400">Last update: {formatDistanceToNow(lastUpdateTime, { addSuffix: true })}</span>}
          {error && <span className="text-xs text-red-400">Connection Error</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
        {error ? (
          renderError(error)
        ) : (
          logs.map((log, index) => (
            <LogEntry 
              key={log.txHash || Math.random()} 
              log={log} 
              isNew={index >= previousLogsLength - 1}
            />
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}