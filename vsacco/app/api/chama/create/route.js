import prisma from "@/app/lib/prisma";

export async function POST(req) {
    const data = await req.formData();

    //create a function that when invoked will create a chama
    async function createChama(data) {
        const { chama_name, description, location, address, certificate = null } = Object.fromEntries(data);
        
        //Check db if the chama exists
        const existingChama = await prisma.chama.findUnique({
            where: {
                name: chama_name,
            },
        });
        
        if (existingChama) {
            throw new Error("A chama with this name already exists");
        } else {
            // If chama doesn't exist, create a new entry
            try {
                await prisma.chama.create({
                    data: {
                        name: chama_name,
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
        await createChama(data);
        return new Response(JSON.stringify({ message: 'Chama created!' }), 
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

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, since we're using formData
//   },
// };
