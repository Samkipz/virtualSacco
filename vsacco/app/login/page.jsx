"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      idNum: '',
      password: '',
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = response;
          console.log("User logged in!");

          if (data.isAdmin) {
            router.push("/admin");
            router.refresh();
          } else {
            router.push("/profile");
            router.refresh();
          }
        } else {
          console.error("Failed to log in.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Use your National ID/passport number.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} >
      <CardContent className="grid gap-4">
      
        <div className="grid gap-2">
          <Label htmlFor="idNum">National ID/Passport</Label>
          <Input id="idNum" 
          name="idNum"
          type="number" 
          placeholder="ID/Passport" 
          value={formData.idNum}
          onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" 
          name="password"
          type="password" 
          value={formData.password} 
          onChange={handleChange} required />
        </div>
        
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full">Sign in</Button>
        <CardDescription>
          Dont have an account? <Link href="/register">Register here</Link>
        </CardDescription>
      </CardFooter>
      
      </form>
    </Card>
  )
}

export default Login;