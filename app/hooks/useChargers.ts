import { useState, useCallback } from 'react';
import type { Charger } from '../components/DobiChart';

// Fallback data in case the API fails
const fallbackChargers: Charger[] = [
  {
    id_charger: "CHG-001",
    name: "Fast Charger A1",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
    location: { latitude: -33.4489, longitude: -70.6693, address: "Santiago, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2023-12-01",
    status: "active",
    transactions: 1200,
    cost_generated: 5000.75,
    income_generated: 15000.5,
    balance_total: 10000,
  },
  {
    id_charger: "CHG-002",
    name: "Fast Charger A2",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
    location: { latitude: -33.4489, longitude: -70.6693, address: "Santiago, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2023-12-01",
    status: "active",
    transactions: 800,
    cost_generated: 3000.75,
    income_generated: 9000.5,
    balance_total: 6000,
  }
];

export const useChargers = () => {
  const [chargers, setChargers] = useState<Charger[]>(fallbackChargers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chargers', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch chargers: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the data to match the Charger type
      const transformedData = data.map((charger: any) => ({
        ...charger,
        image: charger.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
        status: charger.status || 'active',
        balance_total: parseFloat(charger.balance_total) || 0,
        transactions: parseInt(charger.transactions) || 0,
        cost_generated: parseFloat(charger.cost_generated) || 0,
        income_generated: parseFloat(charger.income_generated) || 0,
        location: {
          latitude: parseFloat(charger.location?.latitude) || 0,
          longitude: parseFloat(charger.location?.longitude) || 0,
          address: charger.location?.address || 'Unknown Location'
        }
      }));

      setChargers(transformedData);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch chargers'));
      // Keep using fallback data when there's an error
      setChargers(fallbackChargers);
    } finally {
      setLoading(false);
    }
  }, []);

  return { chargers, loading, error, refresh };
}; 