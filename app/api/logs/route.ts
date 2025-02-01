import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { LogEntrySchema } from '../../lib/validations';
import { env } from '../../config/env';
import type { z } from 'zod';

// Define the type for our logs
type LogEntry = z.infer<typeof LogEntrySchema>;

// In-memory storage for logs (replace with database in production)
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
  console.log('POST request received');  // Debug log
  
  try {
    // Log headers for debugging
    const headersList = headers();
    console.log('Headers:', Object.fromEntries(headersList.entries()));

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        }
      });
    }

    // API Key validation
    const apiKey = headersList.get('x-api-key');
    console.log('Received API Key:', apiKey);  // Debug log
    console.log('Expected API Key:', process.env.API_KEY);  // Debug log

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    // Parse body
    const body = await request.json();
    console.log('Request body:', body);  // Debug log

    // Validate body
    const validationResult = LogEntrySchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Validation error:', validationResult.error);  // Debug log
      return NextResponse.json(
        { error: 'Invalid request body', details: validationResult.error },
        { status: 400 }
      );
    }

    // Store log
    logs.push(validationResult.data);
    console.log('Log stored successfully');  // Debug log

    return NextResponse.json(
      { message: 'Log received successfully', log: validationResult.data },
      { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
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
    const response = await fetch('https://dobi-mantle.dobprotocol.com/api/logs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const rawData = await response.json();
    console.log('Raw API Response:', rawData);

    // Handle both single and multiple log entries
    const logsToProcess = Array.isArray(rawData) ? rawData : [rawData];
    
    // Transform each log entry
    const transformedLogs = logsToProcess.map(log => ({
      sender: log.data?.["contract address"] || "unknown",
      amount: log.data?.amount || "0",
      txHash: log.data?.tx_hash || `0x${Math.random().toString(16).substring(2, 14)}`,
      timestamp: new Date().toISOString(),
      status: log.data?.status === "Only 15 blocks passed; waiting for at least 20 blocks." 
        ? "pending" 
        : "completed",
      network: "Mantle",
      raw_response: {
        message: log.message || "Unknown message",
        data: {
          raw_response: log.data?.raw_response || "",
          final_decision: log.data?.final_decision || "",
          "contract address": log.data?.["contract address"] || "",
          status: log.data?.status || "",
          think_process: log.data?.raw_response || "",
          agent: log.data?.agent || "",
          target: log.data?.target || "",
          tx_hash: log.data?.tx_hash || ""
        }
      }
    }));

    // Keep only unique logs based on txHash
    const uniqueLogs = Array.from(
      new Map(transformedLogs.map(log => [log.txHash, log])).values()
    );

    console.log('Transformed Logs:', uniqueLogs);
    return NextResponse.json(uniqueLogs);

  } catch (error) {
    console.error('Logs API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
} 