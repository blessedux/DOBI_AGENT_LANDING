# DOBI Agent Logs API Integration Guide

## Setup

1. API Endpoint: https://dobi-agent-landing.vercel.app/api/logs
2. API Key: [YOUR_API_KEY_HERE]
3. Required Headers:
   - Content-Type: application/json
   - x-api-key: [YOUR_API_KEY_HERE]

## Request Format

POST request body must include:

- sender: Wallet address (0x...)
- amount: Transaction amount
- txHash: Transaction hash (0x...)
- timestamp: ISO timestamp
- status: "pending" | "completed" | "failed"
- network: Network name (e.g., "mantle-testnet")

## Sending Logs

```javascript
const sendLog = async (txData) => {
  try {
    const response = await fetch("https://your-deployed-url.com/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "[YOUR_API_KEY_HERE]",
      },
      body: JSON.stringify({
        sender: txData.from,
        amount: txData.value,
        txHash: txData.hash,
        timestamp: new Date().toISOString(),
        status: "completed",
        network: "mantle-testnet",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Log sent successfully");
  } catch (error) {
    console.error("Error sending log:", error);
  }
};
```

## Example Usage with Contract Events

```javascript
contract.on("Transfer", (from, to, amount, event) => {
  sendLog({
    from,
    value: amount.toString(),
    hash: event.transactionHash,
  });
});
```
