import prisma from "@/app/lib/prisma";

// app/api/user/create/route.js
 // Update this path based on your actual structure

export async function POST(req) {
  const data = await req.formData();

  // Simulating a createUser function, replace this with your actual logic
  async function createUser(data) {
    // Your server-side logic here
    console.log('User data received:', data);
    // Example: create a user in the database
    // await prisma.user.create({ data });
  }

  try {
    await createUser(data);
    return new Response(JSON.stringify({ message: 'User created!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

