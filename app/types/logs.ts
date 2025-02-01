import type { z } from 'zod';
import type { LogEntrySchema } from '../lib/validations';

// Define the raw response data structure
interface RawResponseData {
  raw_response?: string;
  final_decision?: string;
  "contract address"?: string;
  status?: string;
  think_process?: string;
  agent?: string;
  target?: string;
  tx_hash?: string;
}

interface RawResponse {
  message?: string;
  data?: RawResponseData;
}

// Use the type inference from Zod schema
export type TransactionLog = z.infer<typeof LogEntrySchema>;

export interface ApiResponse {
  message: string;
  data: {
    "contract address": string;
    status: string;
    amount?: string;
    network?: string;
    timestamp?: string;
    raw_response?: string;
  }
}

export interface LogsResponse {
  logs: TransactionLog[];
  message?: string;
  success: boolean;
  timestamp: string;
} 