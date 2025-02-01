import { useState, useEffect } from 'react';
import type { TransactionLog } from '../types/logs';
import { env, validateEnv } from '../config/env';

export function useLogs() {
  const [logs, setLogs] = useState<TransactionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received logs data:', data);

        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          console.error('Unexpected data format:', data);
          setLogs([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return { logs, loading, error };
} 