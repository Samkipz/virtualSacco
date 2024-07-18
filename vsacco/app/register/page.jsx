"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ImEnter } from "react-icons/im";
import FileUpload from '../ui/fileUpload/page';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    othernames: '',
    gender: '',
    dob: '',
    idNum: '',
    idFile: null,
    email: '',
    phone1: '',
    phone2: '',
    password1: '',
    password2: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleFileUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      idFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log("User created!");
        router.push("/login");
      } else {
        console.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row bg-white 
     border bg-card text-card-foreground mt-12 mx-8 h-max  rounded-lg shadow-2xl w-full max-w-4xl">
        <div className="flex flex-col w-full md:w-1/2 p-4 pb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">General Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="border-b"
                />
              </div>
              <div>
                <Label htmlFor="othernames">Other Names</Label>
                <Input
                  id="othernames"
                  type="text"
                  name="othernames"
                  placeholder="Other Names"
                  value={formData.othernames}
                  onChange={handleChange}
                  required
                  className="border-b"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="block w-full mt-1 rounded-md border-b shadow-sm"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="border-b"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="idNum">ID/Passport Number</Label>
              <Input
                id="idNum"
                type="number"
                name="idNum"
                placeholder="ID/Passport Number"
                value={formData.idNum}
                onChange={handleChange}
                required
                className="border-b"
              />
            </div>
            <div className='flex flex-row'>
              <Label className='mb-4'>Upload National ID Image</Label>
              </div>
            <div className='flex flex-col flex-grow gap-4 relative'>
              
              <div className='flex flex-row justify-center h-24 p-12 '>
               <FileUpload onFileUpload={handleFileUpload}/>
              </div>
              
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-12 md:mt-0 md:w-1/2 p-4 pb-8 bg-primary text-white md:rounded-r-lg">
          <h2 className="text-2xl font-semibold mb-8">Contact Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white text-black border-b"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone1">Phone</Label>
                <Input
                  id="phone1"
                  type="text"
                  name="phone1"
                  placeholder="Phone e.g. 0712345678"
                  value={formData.phone1}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-b"
                />
              </div>
              <div>
                <Label htmlFor="phone2">Alternative Phone</Label>
                <Input
                  id="phone2"
                  type="text"
                  name="phone2"
                  placeholder="Alternative number"
                  value={formData.phone2}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-b"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password1">Password</Label>
                <Input
                  id="password1"
                  type="password"
                  name="password1"
                  placeholder="Enter password"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-b"
                />
              </div>
              <div>
                <Label htmlFor="password2">Repeat Password</Label>
                <Input
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="Repeat password"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-b"
                />
              </div>
            </div>
            <div className="flex items-center ">
              <Input
                id="terms"
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
                className="mr-2 bg-white text-black w-min"
              />
              <Label htmlFor="terms">
                I do accept the <Link href="#" className="underline">Terms and Conditions</Link> of this site.
              </Label>
            </div>
            <div>
              <Button type="submit" 
              className="w-full mt-2 bg-white text-black flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
                <ImEnter /> Register
              </Button>
              <div className="mt-4">
                Already have an account? <Link href="/login" className="underline">Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
