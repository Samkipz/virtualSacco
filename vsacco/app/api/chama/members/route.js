import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//-------------------- fetch chama members ----------//
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const chamaId = parseInt(id);
    console.log("===> Backend ID", chamaId)

    try {
      const chamaMembers = await prisma.user_has_chama.findMany({
        where: {
          chama_id: chamaId,
          user: {
            deleted: 0,  // This filters users with deleted field set to 0
          }
        },
        include: {
          user: true,  // Include the user relation
        },
        });
        // return new NextResponse({body: JSON.stringify(chamaList)}, {status: 200})
  
        return new NextResponse(JSON.stringify(chamaMembers),{status: 200});
      } catch (error) {
        return new NextResponse('Internal Server Error Occured\n'+error, { status: 500 });
      }
}
