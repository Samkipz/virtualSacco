import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're using formData
  },
};

export async function POST(req) {
  try {
    const data = await req.formData();

    const formData = {};
    for (const [key, value] of data.entries()) {
      formData[key] = value;
    }

    const file = formData.idFile;
    let fileUrl = null;

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `docs/${fileName}`);

      try {
        const snapshot = await uploadBytes(storageRef, new Uint8Array(fileBuffer), {
          contentType: file.type,
        });
        fileUrl = await getDownloadURL(snapshot.ref);
      } catch (err) {
        console.error('Error uploading file:', err);
        return NextResponse.json({ message:'Error uploading file', error: err.error }, { status: 500 });
        // return res.status(500).json({ error: 'File upload failed' });
      }
    }
    if (!file) {
      return NextResponse.json({ error:'Please attach your id/passport'}, { status: 400 });
    }

    const { firstname, othernames, gender, dob, idNum, email, phone1, phone2, password1, password2, terms } = formData;

    if (password1 !== password2) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    if (terms !== 'true') {
      return NextResponse.json({ error: 'You must accept the terms and conditions' }, { status: 400 });
    }

    const userIdNum = parseInt(idNum);

    const existingUser = await prisma.user.findUnique({
      where: { idNum: userIdNum },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this ID number already exists' }, { status: 400 });
    }

    const dobISO = new Date(dob).toISOString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

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
        idFileUrl: fileUrl,
      },
    });

    return NextResponse.json({ message: 'User created!' }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message:'Internal server error occured', error: err.error }, { status: 500 });
  }
}
