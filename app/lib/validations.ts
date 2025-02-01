import { z } from 'zod';

export const LogEntrySchema = z.object({
  sender: z.string(),
  amount: z.string(),
  txHash: z.string(),
  timestamp: z.string().refine((ts) => !isNaN(Date.parse(ts)), {
    message: "Invalid timestamp format",
  }),
  status: z.enum(["completed", "failed", "pending"]),
  network: z.string(),
  raw_response: z.object({
    message: z.string().optional(),
    data: z.object({
      raw_response: z.string().optional(),
      final_decision: z.string().optional(),
      "contract address": z.string().optional(),
      status: z.string().optional(),
      think_process: z.string().optional(),
      agent: z.string().optional(),
      target: z.string().optional(),
      tx_hash: z.string().optional(),
    }).optional(),
  }).optional(),
});

export type LogEntry = z.infer<typeof LogEntrySchema>; 