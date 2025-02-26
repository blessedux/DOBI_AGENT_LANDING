"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLogs } from '../../hooks/useLogs';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { TransactionLog } from '../../types/logs';

// Helper function to safely format timestamp
const formatTimestamp = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
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

// Add this helper function
const formatChargerLog = (log: TransactionLog) => {
  if (log.txHash.startsWith('CHG-')) {
    return {
      ...log,
      type: 'charger',
      displayAmount: `$${parseFloat(log.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      displayStatus: log.status === 'active' ? 'Online' : 'Maintenance'
    };
  }
  return log;
};

interface ChargerData {
  id_charger: string;
  balance_total: number;
  income_generated: number;
  cost_generated: number;
}

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
            {formatTimestamp(new Date(log.timestamp))}
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
  const [chargerData, setChargerData] = useState<ChargerData[]>([]);
  const [lastChargerSyncTime, setLastChargerSyncTime] = useState<Date>(new Date());
  const [logTimestamps, setLogTimestamps] = useState<Map<string, Date>>(new Map());
  const [currentTime, setCurrentTime] = useState(new Date());

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
          `%c${formatTimestamp(new Date(log.timestamp))} | ${log.network} | ${log.status}`,
          'color: #4CAF50; font-weight: bold'
        );
        if (log.raw_response) {
          console.log('📝 Details:', log.raw_response);
        }
      });
      console.groupEnd();
      
      // Auto-scroll to bottom for new logs
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const now = new Date();
      setLogTimestamps(prev => {
        const updated = new Map(prev);
        newLogs.forEach(log => {
          if (!updated.has(log.txHash)) {
            updated.set(log.txHash, now);
          }
        });
        return updated;
      });
      setLastUpdateTime(now);
      setPreviousLogsLength(logs.length);
    }
  }, [logs, previousLogsLength]);

  // Add function to fetch charger data
  const fetchChargerData = async () => {
    try {
      const response = await fetch('https://dobi-mantle.dobprotocol.com/api/logs');
      const data = await response.json();
      setChargerData(data);
      setLastChargerSyncTime(new Date());
    } catch (error) {
      console.error('Error fetching charger data:', error);
    }
  };

  // Modify the polling effect
  useEffect(() => {
    // Initial fetch
    refresh();
    fetchChargerData();
    setCurrentTime(new Date());

    // Set up polling intervals
    const interval = setInterval(async () => {
      await refresh();
      await fetchChargerData();
      setCurrentTime(new Date()); // Update timestamp only when new data arrives
      console.log('Fetching new data...'); // Debug log
    }, 10000);

    // Cleanup
    return () => clearInterval(interval);
  }, []); // Remove dependencies to prevent multiple intervals

  // Add debug logging for charger data updates
  useEffect(() => {
    console.log('Charger data updated:', chargerData);
  }, [chargerData]);

  // Helper function to get latest charger data
  const getChargerData = (chargerId: string) => {
    return chargerData.find(c => c.id_charger === chargerId);
  };

  // Modify renderLogEntry to use the currentTime state
  const renderLogEntry = (log: TransactionLog, index: number) => {
    const isCharger = log.txHash.startsWith('CHG-');
    const charger = isCharger ? getChargerData(log.txHash) : null;
    
    return (
      <div key={log.txHash || Math.random()} 
        className={`mb-2 p-2 rounded ${
          index >= previousLogsLength - 1 ? 'animate-highlight' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">
              {formatTimestamp(currentTime)}
            </span>
            <span className={`px-2 py-0.5 rounded ${
              isCharger 
                ? log.status === 'active' 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
                : getStatusColor(log.status)
            }`}>
              {isCharger ? log.displayStatus : formatStatus(log.status)}
            </span>
          </div>
          
          {/* Add completed tag */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500 font-medium">
              ✓ completed
            </span>
          </div>
        </div>
        
        <div className="mt-1">
          <span className="text-gray-300">
            {isCharger ? 'Charger ID: ' : 'TX: '}
          </span>
          <span className="font-mono text-gray-400">
            {isCharger ? log.txHash.replace('CHG-', '') : log.txHash}
          </span>
        </div>

        <div className="mt-1">
          <span className="text-gray-300">
            {isCharger ? 'Balance: ' : 'Amount: '}
          </span>
          <span className="text-gray-200">
            {isCharger && charger 
              ? `$${charger.balance_total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}` 
              : log.amount}
          </span>
        </div>

        {isCharger && charger && (
          <div className="mt-1 flex gap-4">
            <div>
              <span className="text-gray-300">Income: </span>
              <span className="text-green-400">
                ${charger.income_generated.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Cost: </span>
              <span className="text-red-400">
                ${charger.cost_generated.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

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
          {loading ? (
            <span className="text-xs text-yellow-400 animate-pulse">Syncing...</span>
          ) : (
            <span className="text-xs text-gray-400">
              Charging data synced {formatDistanceToNow(lastChargerSyncTime, { addSuffix: true })}
            </span>
          )}
          {error && <span className="text-xs text-red-400">Connection Error</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
        {error ? (
          renderError(error)
        ) : (
          logs.map((log, index) => renderLogEntry(log, index))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}