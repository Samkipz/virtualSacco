import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const data = await req.formData();

  // Extract form data
  const formData = {};
  for (const [key, value] of data.entries()) {
    formData[key] = value;
  }

  // Handle file upload
  const file = formData.idFile;
  let fileBuffer = null;
  if (file) {
    fileBuffer = await file.arrayBuffer();
    console.log('File received:', file.name);
  }

  async function createUser(data) {
    console.log('User data received:', data);

    if (data.password1 !== data.password2) {
      throw new Error("The provided passwords do not match");
    }

    if (data.terms.toString() !== 'true') {
      throw new Error("You have to accept our terms and conditions to proceed");
    }

    const userIdNum = parseInt(data.idNum);
    const existingUser = await prisma.user.findUnique({
      where: {
        idNum: userIdNum,
      },
    });

    if (existingUser) {
      throw new Error("User with this ID number already exists");
    }

    const { firstname, othernames, gender, dob, email, phone1, phone2, password1 } = data;
    const dobISO = new Date(dob).toISOString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    try {
      await prisma.user.create({
        data: {
          firstname,
          othernames,
          gender,
          dob: dobISO,
          idNum: userIdNum,
          email,
          phone1,
          phone2,
          password: hashedPassword,
          idFile: fileBuffer ? Buffer.from(fileBuffer) : null,  // Save file as BLOB
        },
      });

      return { success: true };
    } catch (err) {
      console.log(err);
      throw new Error("Some error occurred while creating the user");
    }
  }

  try {
    await createUser(formData);
    return new Response(JSON.stringify({ message: 'User created!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're using formData
  },
};
