import { useState, useEffect, useCallback } from 'react';
import type { TransactionLog } from '../types/logs';
import { env, validateEnv } from '../config/env';
import { parseISO } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

export const useLogs = () => {
  const [logs, setLogs] = useState<TransactionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      // Add timestamp to prevent caching
      const response = await fetch(`/api/logs?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      
      const transformedData = data.map((log: TransactionLog) => ({
        ...log,
        timestamp: log.timestamp || new Date().toISOString(),
      }));

      console.log('Fetched logs:', transformedData.length);
      setLogs(transformedData);
      setError(null);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up more frequent polling (every 2 seconds)
  useEffect(() => {
    // Initial fetch
    fetchLogs();
    
    // Set up polling interval
    const interval = setInterval(() => {
      console.log('Polling for new logs...');
      fetchLogs();
    }, 2000); // Poll every 2 seconds

    return () => {
      console.log('Cleaning up logs polling');
      clearInterval(interval);
    };
  }, [fetchLogs]);

  const refresh = useCallback(() => {
    console.log('Manual refresh triggered');
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, refresh };
}; 