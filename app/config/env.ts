export const env = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://dobi-mantle.dobprotocol.com/api/logs',
} as const;

// Validate environment variables
export function validateEnv() {
  if (!env.API_KEY) {
    console.error('Missing API key in environment variables');
    return false;
  }
  
  if (!env.API_URL) {
    console.error('Missing API URL in environment variables');
    return false;
  }

  // Add debug logging
  console.log('Environment validation:', {
    hasApiKey: !!env.API_KEY,
    apiKeyLength: env.API_KEY?.length,
    apiUrl: env.API_URL,
  });

  return true;
} 