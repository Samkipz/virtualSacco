// app/lib/actions/createChama.js

"use server";
import prisma from "../prisma";

// Create or update a Chama
export async function createChama(formData) {
  const entries = Array.from(formData.entries());
  const { chama_name, description, location, address, certificate = null } = Object.fromEntries(entries);

  try {
    // Check if chama already exists
    const existingChama = await prisma.chama.findUnique({
      where: {
        name: chama_name,
      },
    });

    if (existingChama) {
      // If chama exists, update its details
      console.log('-------->',existingChama)
      await prisma.chama.update({
        where: {
          id: existingChama.id,
        },
        data: {
          description,
          location,
          address,
          certificate,
        },
      });
    } else {
      // If chama doesn't exist, create a new entry
      await prisma.chama.create({
        data: {
          name: chama_name,
          description,
          location,
          address,
          certificate,
        },
      });
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create or update chama", err);
  }
}
