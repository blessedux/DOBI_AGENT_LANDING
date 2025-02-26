import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dobi-mantle.dobprotocol.com/api/chargers', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 