// ************* edit wallet id to come from request!!!!!!
// Retrieve wallet transaction details (statement for SETTLEMENT ACCOUNT)
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function POST() {
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;

  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);

  try {
    const wallets = intasend.wallets();
    const response = await wallets.transactions('Q8EPR5M') 
    console.log('Wallets Response:', response);
    
    return NextResponse.json({ message: 'Transactions retrieved', data: response }, { status: 200 });
  } catch (error) {
    console.error('Retrieve Wallet Transaction Error:', error);
    return NextResponse.json({ message: 'Failed to retrieve wallets', error: error.message }, { status: 500 });
  }
}
