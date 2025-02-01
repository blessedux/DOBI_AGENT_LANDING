import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { cors } from '../../lib/cors';
import { LogEntrySchema } from '../../lib/validations';

// Keep only what we need
let logs: Array<{
  sender: string;
  amount: string;
  txHash: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  network: string;
}> = [];

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
  try {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: cors });
    }

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
    
    // Validate request body with Zod
    const validationResult = LogEntrySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validationResult.error },
        { status: 400 }
      );
    }

    // Store in memory
    logs.push(validationResult.data);

    return NextResponse.json(
      { message: 'Log received successfully', log: validationResult.data },
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