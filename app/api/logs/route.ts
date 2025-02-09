import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { LogEntrySchema } from '../../lib/validations';
import { env } from '../../config/env';
import type { z } from 'zod';

// Define the type for our logs
type LogEntry = z.infer<typeof LogEntrySchema>;

// In-memory storage for logs (replace with database in production)
let logs: LogEntry[] = [];

// Simulated logs for testing
let mockLogs: any[] = [];

// Function to generate a new log with THINK process
const generateNewLog = () => {
  const networks = ['Ethereum', 'Polygon', 'BSC'];
  const statuses = ['pending', 'completed', 'failed'];
  const actions = ['swap', 'transfer', 'approve', 'stake'];
  
  const thinkProcess = `<THINK>
1. Analyzing transaction request...
2. Checking gas prices: Current gas price is ${Math.floor(Math.random() * 100)} gwei
3. Evaluating market conditions:
   - Network congestion: ${Math.random() > 0.5 ? 'High' : 'Low'}
   - Price impact: ${(Math.random() * 0.5).toFixed(2)}%
4. Decision making:
   - Transaction type: ${actions[Math.floor(Math.random() * actions.length)]}
   - Priority: ${Math.random() > 0.5 ? 'High' : 'Normal'}
5. Executing transaction with optimized parameters...
</THINK>`;

  return {
    timestamp: new Date().toISOString(),
    network: networks[Math.floor(Math.random() * networks.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    txHash: `0x${Math.random().toString(16).slice(2)}`,
    sender: `0x${Math.random().toString(16).slice(2, 42)}`,
    amount: (Math.random() * 10).toFixed(4),
    raw_response: {
      message: 'Transaction processed',
      data: {
        status: 'success',
        think_process: thinkProcess,
        raw_response: thinkProcess,
        final_decision: `Execute ${actions[Math.floor(Math.random() * actions.length)]} operation`,
        "contract address": `0x${Math.random().toString(16).slice(2, 42)}`,
        agent: "DOBI_v1",
        target: `0x${Math.random().toString(16).slice(2, 42)}`,
      }
    }
  };
};

// Generate initial set of logs
if (mockLogs.length === 0) {
  // Add some initial logs
  for (let i = 0; i < 5; i++) {
    mockLogs.push(generateNewLog());
  }
}

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
    // Fetch both logs and chargers
    const [logsResponse, chargersResponse] = await Promise.all([
      fetch('https://dobi-mantle.dobprotocol.com/api/logs', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${env.API_KEY}`,
        },
      }),
      fetch('https://dobi-mantle.dobprotocol.com/api/chargers', {
        headers: {
          'Accept': 'application/json',
        },
      })
    ]);

    const rawLogs = await logsResponse.json();
    const chargers = await chargersResponse.json();

    // Transform charger data into log format
    const chargerLogs = chargers.map((charger: any) => ({
      timestamp: charger.creation_date,
      network: "Mantle",
      status: charger.status,
      txHash: `CHG-${charger.id_charger}`,
      sender: charger.company_owner,
      amount: charger.balance_total.toString(),
      raw_response: {
        message: `Charger ${charger.name} transaction`,
        data: {
          status: charger.status,
          think_process: `
<THINK>
1. Analyzing charger data...
2. Location: ${charger.location.address}
3. Performance metrics:
   - Transactions: ${charger.transactions}
   - Income: $${charger.income_generated}
   - Costs: $${charger.cost_generated}
   - Balance: $${charger.balance_total}
4. Status: ${charger.status}
5. Model: ${charger.model}
</THINK>`,
          "contract address": charger.id_charger,
          agent: "DOBI_v1",
          target: charger.location.address,
        }
      }
    }));

    // Handle both single and multiple log entries
    const logsToProcess = Array.isArray(rawLogs) ? rawLogs : [rawLogs];
    
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

    // Combine and sort all logs by timestamp
    const allLogs = [...chargerLogs, ...uniqueLogs].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(allLogs);

  } catch (error) {
    console.error('Logs API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
} 