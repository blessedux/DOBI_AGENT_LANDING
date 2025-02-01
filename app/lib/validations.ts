import { z } from 'zod';

export const LogEntrySchema = z.object({
  sender: z.string().startsWith('0x'),
  amount: z.string(),
  txHash: z.string().startsWith('0x'),
  timestamp: z.string().datetime(),
  status: z.enum(['pending', 'completed', 'failed']),
  network: z.string().default('mantle-testnet')
});

export type LogEntryType = z.infer<typeof LogEntrySchema>; 