"use client";

import { useLogs } from '../../hooks/useLogs';
import { formatDistanceToNow } from 'date-fns';

export default function LogsViewer() {
  const { logs, loading, error } = useLogs();

  if (loading) return <div>Loading logs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 max-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {logs.map((log, index) => (
          <div 
            key={log.txHash} 
            className="bg-white/5 p-3 rounded-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-300">
                  From: {log.sender.slice(0, 6)}...{log.sender.slice(-4)}
                </p>
                <p className="text-sm font-medium text-white">
                  {log.amount} ETH
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                log.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                log.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {log.status}
              </span>
            </div>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
              <a 
                href={`https://explorer.testnet.mantle.xyz/tx/${log.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                View on Explorer →
              </a>
              <span>
                {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}