import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";

//fetch chama
export async function GET(req) {
  if (req.method === 'GET') {
    try {
      const chamaList = await prisma.chama.findMany({
        where:{
          deleted: 0,
        }
      });

      return new NextResponse(JSON.stringify(chamaList),{status: 200});
    } catch (error) {
      return new NextResponse('Internal Server Error Occured\n'+error, { status: 500 });
    }
  } else {
    return new NextResponse('Method Not Allowed!', { status: 405 });
  }
}
