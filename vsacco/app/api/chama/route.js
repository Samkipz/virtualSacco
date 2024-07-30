import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//--------------------------- create new chama----------------------//
export async function POST(req) {
  //create a function that when invoked will create a chama
  async function createChama(req) {
    let {chamaName, description, location, address, registered, certificate=null} = await req.json();
    console.log(chamaName, description, location, address, registered, certificate);
      
      //Check db if the chama exists
      const existingChama = await prisma.chama.findUnique({
          where: {
              name: chamaName,
          },
      });

      //Check db if the cetificate already exists
      if (certificate){
        const existingCert = await prisma.chama.findUnique({
          where: {
            certificate: certificate,
          },
        });
        if (existingCert) {
          throw new Error("A chama with this certificate already exist in our database. Please contact admin.");
        }
      }
      if (existingChama) {
          throw new Error("A chama with this name already exists. Please contact admin.");
      } else {
          // If chama doesn't exist, create a new entry
          try {
              await prisma.chama.create({
                  data: {
                      name: chamaName,
                      description,
                      location,
                      address,
                      certificate,
                  },
              });
          }catch (err) {
              console.log(err);
              throw new Error("Some error occurred while creating the chama");
          }
      }
      return { success: true };
  }
  
  //invoke the create chama function passing into it the data that we received from the form
  //then return a json response
  try {
      await createChama(req);
      revalidatePath("/chama");
      revalidatePath("/admin/cbo");
      return new Response(JSON.stringify({ message: 'New Chama successfully created!' }), 
      {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
      }
  );} catch (error) {
      return new Response(JSON.stringify({ error: error.message }), 
      {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      }
  );}
}

//-----------------------------fetch one or all chamas--------------------//
export async function GET(req) {
  if (req.method === 'GET') {
    //Extract parameters from the url
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    // ---------------------- ANOTHER BETTER APPROACH --------------//
    //          const { searchParams } = new URL(request.url)       //
    //          const id = searchParams.get('id')                   //
    // -------------------------------------------------------------//

    //If parameters does not exist return all chamas else return according to parameter
    if (id === 0){
      try {
        const chamaList = await prisma.chama.findMany({
          where:{
            deleted: 0,
          }
        });

        // return new NextResponse({body: JSON.stringify(chamaList)}, {status: 200})
  
        return new NextResponse(JSON.stringify(chamaList),{status: 200});
      } catch (error) {
        return new NextResponse('Internal Server Error Occured\n'+error, { status: 500 });
      }
    } else{
      try {
        const chamaList = await prisma.chama.findUnique({
          where:{
            id: id,
            deleted: 0,
          },
          include: {
            user_has_chama: true,
          }
        });
  
        return new NextResponse(JSON.stringify(chamaList),{status: 200});
      } catch (error) {
        return new NextResponse('Internal Server Error Occured\n'+error, { status: 500 });
      }
    }

  } else {
    return new NextResponse('Method Not Allowed!', { status: 405 });
  }
}

