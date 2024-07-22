import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

export async function POST(request) {
  const { phone, amount,  narrative, wallet_id } = await request.json();
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;

  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);
  // const wallet = intasend.wallets();

  const payouts = intasend.payouts();
  var req_approval = "YES" // Set to 'NO' if you want the transaction 
                         // to go through without calling the approve method

  try {
    // const response = await wallet.intraTransfer(source_wallet_id, destination_wallet_id, amount, narrative);
    const response = await payouts.mpesa({
      currency: 'KES',
      requires_approval: req_approval, 
      transactions: [{
        name: 'SAMUEL NDIEMA',
        account: phone,
        amount: amount,
        narrative: narrative
      }],
      wallet_id:wallet_id
    })

    console.log('Wallet withdrawal successful:', response);

    try{
      const approveResponse = await payouts.approve(response, false);
      console.log('Payouts approve:', approveResponse);
    }catch(err){
      console.error(`Payouts approve error:`,err);
    };
    return NextResponse.json({ message: 'Wallet withdrawal successful', data: response }, { status: 200 });

  } catch (error) {
    console.error('Wallet withdrawal Error:', error);
    return NextResponse.json({ message: 'Wallet withdrawal Failed', error: error.message }, { status: 500 });
  }
}

// // const IntaSend = require('intasend-node');

// // const intasend = new IntaSend(/*...Authenticate*/)

// let payouts = intasend.payouts();

// payouts
//     .mpesa({
//       currency: 'KES',
//       transactions: [{
//         name: 'Joe Doe',
//         account: '254708374149',
//         amount: '1000',
//         narrative: 'Reason for payment'
//       }],
//       wallet_id:"<wallet_id>"
//     })
//     .then((resp) => {
//       console.log(`Payouts response:`, resp);
//       // Approve payouts method can be called here if you would
//       // like to auto-approve immediately
//     })
//     .catch((err) => {
//       console.error(`Payouts error:`, err);
//     });