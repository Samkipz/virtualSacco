// app/api/instasend/route.js

import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';

const checkStatus = async (collection, invoiceId, intervalId) => {
  try {
    const response = await collection.status(invoiceId);
    console.log('Status Check Response:', response);

    if (response && response.invoice) {
      const { state: status } = response.invoice;
      console.log('Payment Status:', status);

      if (status !== 'PROCESSING') {
        clearInterval(intervalId);
        console.log(`Final status: ${status}`);
      }
    } else {
      console.error('Invalid response structure:', response);
      clearInterval(intervalId);
    }
  } catch (error) {
    console.error('Status Check Error:', error);
    clearInterval(intervalId);
  }
};

export async function POST(request) {
  const { phone, amount, first_name, last_name, email } = await request.json();
  const { INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY } = process.env;

  const intasend = new IntaSend(INTASEND_PUBLISHABLE_KEY, INTASEND_SECRET_KEY, true);

  try {
    const collection = intasend.collection();
    const response = await collection.mpesaStkPush({
      first_name,
      last_name,
      email,
      host: 'https://yourwebsite.com', // Replace with your actual host
      amount,
      phone_number: phone,
      api_ref: 'test', // Replace with your actual reference
    });

    console.log('STK Push Response:', response);

    const invoiceId = response.invoice.invoice_id;

    // Set an interval to check the status every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(() => {
      checkStatus(collection, invoiceId, intervalId);
    }, 5000);

    return NextResponse.json({ message: 'STK Push initiated', data: response }, { status: 201 });
  } catch (error) {
    console.error('STK Push Error:', error);
    return NextResponse.json({ message: 'Failed', error: error.message }, { status: 500 });
  }
}
