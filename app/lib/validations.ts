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
});

export type LogEntry = z.infer<typeof LogEntrySchema>; 