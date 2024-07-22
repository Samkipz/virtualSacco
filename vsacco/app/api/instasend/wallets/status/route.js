import IntaSend from 'intasend-node';
import { NextResponse } from 'next/server';

export async function POST(request){
    const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;
    const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);
    const {tracking_id} = await request.json();

    const payouts = intasend.payouts();

    try{
        const response = await payouts.status({"tracking_id": tracking_id});
        console.log('Status check successful:', response);
        return NextResponse.json({ message: 'Status check successful', data: response }, { status: 200 });
    }catch (error) {
        console.error('Status check Error:', error);
        return NextResponse.json({ message: 'Status check Failed', error: error.message }, { status: 500 });
      }
}

