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
import { FaExclamationCircle } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { getUser } from "../lib/actions/getUser";

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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [userPresent, setUserPresent] = useState(false);
  // const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  const checkUser = async () => {
    const us = await getUser();
    if (us) {
      setUserPresent(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if(userPresent) router.push('/profile');

  // 1. Define form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNum: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values) {
    setPending(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) setPending(false);

      if (response.ok) {
        setMessage(
          <p className="font-semibold text-green-500 flex flex-col items-center justify-center">
            <GrStatusGood /> User Loged in!. Redirecting, please wait.
          </p>
        );
        await router.push("/admin");
      } else {
        const responseText = await response.text();

        // Handle the case where the response text is empty
        if (responseText && responseText.trim() !== "") {
          try {
            const error = JSON.parse(responseText);
            setError(error.message);
          } catch (jsonError) {
            setError("An unexpected error occurred while parsing the response");
          }
        } else {
          setError("An unexpected error occurred");
        }
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="idNum"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>National ID/Passport</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ID/Passport" {...field} value={field.value || ""} />
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
                    <Input type="password" placeholder="Password" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            {message ||
              (error && (
                <span
                  className={clsx("flex flex-col items-center justify-center", {
                    "text-green-500": message,
                    "text-red-500": error,
                  })}
                >
                  {message ? (
                    <>
                      <GrStatusGood />
                      {message}{" "}
                    </>
                  ) : error ? (
                    <>
                      <FaExclamationCircle /> {error}
                    </>
                  ) : undefined}
                </span>
              ))}

            {pending ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loging in.. Please wait
              </Button>
            ) : (
              <Button className="w-full">Sign in</Button>
            )}
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
