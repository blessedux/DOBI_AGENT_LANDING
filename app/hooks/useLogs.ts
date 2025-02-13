import { useState, useCallback } from 'react';
import type { TransactionLog } from '../types/logs';

export const useLogs = () => {
  const [logs, setLogs] = useState<TransactionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/logs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch logs'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { logs, loading, error, refresh };
}; 