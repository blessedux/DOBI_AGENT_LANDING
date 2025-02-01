import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { cors } from '@/lib/cors';  // We'll create this

// Define the log entry type for smart contract interactions
export interface LogEntry {
  sender: string;          // Wallet address that initiated the transaction
  amount: string;          // Amount involved in the transaction
  txHash: string;          // Transaction hash
  timestamp: string;       // ISO timestamp of the transaction
  status: 'pending' | 'completed' | 'failed';  // Transaction status
  network: string;         // Network name (e.g., 'mantle-testnet')
}

// Temporary in-memory storage (replace with database in production)
let logs: LogEntry[] = [];

/**
 * POST /api/logs
 * 
 * Endpoint to receive new transaction logs from smart contracts
 * 
 * Headers Required:
 * - x-api-key: Your API key for authentication
 * 
 * Example Request Body:
 * {
 *   "sender": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
 *   "amount": "0.5",
 *   "txHash": "0x123...abc",
 *   "timestamp": "2024-02-20T15:30:00Z",
 *   "status": "completed",
 *   "network": "mantle-testnet"
 * }
 */
export async function POST(request: Request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: cors });
  }

  try {
    const response = NextResponse.next();
    // Add CORS headers to all responses
    Object.entries(cors).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    const headersList = headers();
    const apiKey = headersList.get('x-api-key');
    
    // Validate API key
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.sender || !body.amount || !body.txHash || !body.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add the log entry
    const newLog: LogEntry = {
      sender: body.sender,
      amount: body.amount,
      txHash: body.txHash,
      timestamp: body.timestamp,
      status: body.status || 'pending',
      network: body.network || 'mantle-testnet'
    };

    logs.push(newLog);

    return NextResponse.json(
      { message: 'Log received successfully', log: newLog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing log:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/logs
 * 
 * Endpoint to retrieve all transaction logs
 * No authentication required for GET requests
 */
export async function GET() {
  try {
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 