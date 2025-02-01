import { useState, useEffect } from 'react';
import { LogEntry } from '../api/logs/route';

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        setLogs(data.logs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchLogs();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchLogs, 5000);

    return () => clearInterval(interval);
  }, []);

  return { logs, loading, error };
} 