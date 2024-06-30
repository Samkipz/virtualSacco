import { generateToken } from './generateToken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { phone, amount } = await request.json();
  const { MPESA_BUSINESS_SHORT_CODE, MPESA_PASS_KEY } = process.env;

  const phoneSub = phone.substring(1);

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(
    `${MPESA_BUSINESS_SHORT_CODE}${MPESA_PASS_KEY}${timestamp}`
  ).toString('base64');

  const payload = {
    BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: `254${phoneSub}`,
    PartyB: MPESA_BUSINESS_SHORT_CODE,
    PhoneNumber: `254${phoneSub}`,
    CallBackURL: 'https://rnndx-196-202-217-130.a.free.pinggy.link/api/mpesa/callback',
    AccountReference: `254${phoneSub}`,
    TransactionDesc: 'Payment',
  };

  try {
    const token = await generateToken();
    const response = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return NextResponse.json({ message: 'Success!', data }, { status: 201 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ message: 'Failed', error: error.message }, { status: 500 });
  }
}
