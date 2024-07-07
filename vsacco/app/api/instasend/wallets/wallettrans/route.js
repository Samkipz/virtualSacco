// Fetch a single wallet trnsaction (WORKING WALLET)
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function GET(request){
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY} = process.env;
  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);

  // Extract query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const wallet_id = searchParams.get('wallet_id');
  console.log("Request: ---- :", wallet_id);
    
  try{
      const wallets = intasend.wallets();
      const response = await wallets.transactions(wallet_id);

      console.log("Response from GET a wallet:", response);
      return NextResponse.json({message:"Fetched Wallet:", data:response}, {status: 200});
  }catch(error){
      console.log("An error occured retrieving the specified wallet", error);
      return NextResponse.json({ message: 'Failed to fetch wallet', error: error.message }, { status: 500 });
  }
  
}