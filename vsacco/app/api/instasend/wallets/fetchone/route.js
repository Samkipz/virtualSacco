import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function GET(request) {
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;

  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);
  const wallets = intasend.wallets();

  // Extract query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const wallet_label = searchParams.get('label');

  try {
    // Retrieve the list of wallets
    const response = await wallets.list();
   
    // Filter the wallets to find the one with the matching wallet_id
    const wallet = response.results.find(wallet => wallet.label === wallet_label);

    if (wallet) {
      return NextResponse.json({ message: 'Wallet retrieved', data: wallet }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Wallet not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Retrieve Wallets Error:', error);
    return NextResponse.json({ message: 'Failed to retrieve wallets', error: error.message }, { status: 500 });
  }
}
