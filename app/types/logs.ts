import type { z } from 'zod';
import type { LogEntrySchema } from '../lib/validations';

export interface ApiResponse {
  message: string;
  data: {
    "contract address": string;
    status: string;
    amount?: string;
    network?: string;
    timestamp?: string;
    raw_response?: any;
  }
}

export type TransactionLog = z.infer<typeof LogEntrySchema>;

export interface LogsResponse {
  logs: TransactionLog[];
  message?: string;
  success: boolean;
  timestamp: string;
} 