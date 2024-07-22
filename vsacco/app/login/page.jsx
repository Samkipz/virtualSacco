"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  idNum: z
    .string()
    .min(8, {
      message: "National IDs should be 8 digits while Passports 12 digits.",
    })
    .max(12, {
      message: "National IDs should be 8 digits while Passports 12 digits.",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idNum: "",
    password: "",
  });
  const [message, setMessage] = useState(null)

  // 1. Define form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNum: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(JSON.stringify(response,null,2));

      if (response.ok) {
        const data = response;
        alert("User logged in!");

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
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Use your National ID/passport number.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="idNum"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>National ID/Passport</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ID/Passport" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign in</Button>
            <CardDescription>
              Dont have an account? <Link href="/register">Register here</Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default Login;
