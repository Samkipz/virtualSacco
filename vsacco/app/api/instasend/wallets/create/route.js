import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function POST(request){
    const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;
    const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);
    const { label,wallet_type,  currency, can_disburse } = await request.json();

    try{
        const wallets = intasend.wallets();

        const response = await wallets.create({
            label,
            wallet_type,
            currency,
            can_disburse
        });

        console.log('Wallets Response:', response);
        return NextResponse.json({ message: 'A new wallet has been created successfully', data: response }, { status: 201 });
    }catch(error){
        console.error('Creating Wallet error:', error);
        return NextResponse.json({ message: 'Failed to create wallet', error: error.message }, { status: 500 });
    }
}

