import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function POST(request) {
  const { amount, narrative, source_wallet_id, destination_wallet_id } = await request.json();
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;

  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);
  const wallet = intasend.wallets();

  try {
    const response = await wallet.intraTransfer(source_wallet_id, destination_wallet_id, amount, narrative);

    console.log('Wallet Intra-transfer successful:', response);
    return NextResponse.json({ message: 'Wallet Intra-transfer successful', data: response }, { status: 201 });

  } catch (error) {
    console.error('Wallet Intra-transfer Error:', error);
    return NextResponse.json({ message: 'Wallet Intra-transfer Failed', error: error.message }, { status: 500 });
  }
}





let amount = 100;
let narrative = 'Payment';

