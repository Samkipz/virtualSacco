// import { initializeApp } from "firebase/app";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCAkERsloURF-HWlRSQ3kqoDF7pUi7f9y8",
//   authDomain: "virtual-sacco.firebaseapp.com",
//   projectId: "virtual-sacco",
//   storageBucket: "virtual-sacco.appspot.com",
//   messagingSenderId: "232048608214",
//   appId: "1:232048608214:web:c4ce70747d56e7c7049a77",
//   measurementId: "G-CL27WCBGH4",
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// const testUpload = async () => {
//   const storageRef = ref(storage, "test.txt");
//   const file = new Blob(["Hello, world!"], { type: "text/plain" });
//   try {
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log("Uploaded a blob or file!", snapshot);
//   } catch (error) {
//     console.error("Upload failed", error);
//   }
// };

// testUpload();

"use client";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCAkERsloURF-HWlRSQ3kqoDF7pUi7f9y8",
//   authDomain: "virtual-sacco.firebaseapp.com",
//   projectId: "virtual-sacco",
//   storageBucket: "virtual-sacco.appspot.com",
//   messagingSenderId: "232048608214",
//   appId: "1:232048608214:web:c4ce70747d56e7c7049a77",
//   measurementId: "G-CL27WCBGH4",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log('===> Firebase Storage Bucket: <====', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    
    


    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>Progress: {progress}%</div>
      {downloadURL && (
        <div>
          File available at: <a href={downloadURL}>{downloadURL}</a>
        </div>
      )}
    </div>
  );
}
