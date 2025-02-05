export interface Charger {
  id_charger: string;
  name: string;
  model: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  company_owner: string;
  creation_date: string;
  status: 'active' | 'maintenance';
  transactions: number;
  cost_generated: number;
  income_generated: number;
  balance_total: number;
} 