import { NextResponse } from 'next/server';

export async function POST(request) {
    const callBackData = await request.body;

    if(callBackData) console.log("DATA RCVD BACK------>",callBackData)
}