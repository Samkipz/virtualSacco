import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log("-------------- Request reached ------");

  try {
    const callBackData = await request.json();
    console.log("DATA RCVD BACK------>", callBackData.CallbackMetadata);
  } catch (error) {
    console.error("Error reading request body:", error);
  }

  return NextResponse.json({ message: 'Received' }, { status: 200 });
}
