import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
        return res.status(500).json({ error: 'File upload failed' });
      }
    }
    if (!file) {
      return res.status(400).json({ error: 'Please attach your id/passport' });
    }

    const { firstname, othernames, gender, dob, idNum, email, phone1, phone2, password1, password2, terms } = formData;

    if (password1 !== password2) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (terms !== 'true') {
      return res.status(400).json({ error: 'You must accept the terms and conditions' });
    }

    const userIdNum = parseInt(idNum);

    const existingUser = await prisma.user.findUnique({
      where: { idNum: userIdNum },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this ID number already exists' });
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

    return res.status(200).json({ message: 'User created!' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
