// Retrieve all wallets.
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function GET() {
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;

  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);

  try {
    const wallets = intasend.wallets();
    const response = await wallets.list();
    
    console.log('Wallets Response:', response);
    
    return NextResponse.json({ message: 'Wallets retrieved', data: response }, { status: 200 });
  } catch (error) {
    console.error('Retrieve Wallets Error:', error);
    return NextResponse.json({ message: 'Failed to retrieve wallets', error: error.message }, { status: 500 });
  }
}
