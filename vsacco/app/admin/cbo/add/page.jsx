"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

const FormSchema = z
  .object({
    chamaName: z.string().min(2, {
      message: "Name of the chama is required.",
    }),
    description: z.string().min(2, {
      message: "Provide details about this Chama.",
    }),
    location: z.string().min(2, {
      message: "You have to give the location.",
    }),
    address: z.string().min(2, {
      message: "You have to provide an address.",
    }),
    registered: z.enum(["true", "false"], {
      required_error: "You must specify if the Chama is registered or not.",
    }),
    certificate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.registered === "true" && !data.certificate) {
      ctx.addIssue({
        path: ["certificate"],
        message:
          "You must provide a certificate number if the Chama is registered.",
      });
    }
  });

const AddCBO = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chamaName: "",
      description: "",
      location: "",
      address: "",
      registered: "false",
    },
  });

  async function onSubmit(data) {
    setSubmitting(true);
    console.log(JSON.stringify(data, null, 2));
    try {
      const response = await fetch("/api/chama", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const msg = JSON.parse(await response.text());
        setSubmitting(false);
        await Swal.fire({
          title: "Chama Created!",
          text: msg.message,
          icon: "success",
        }).then(() => router.push("/admin/cbo"));
      } else {
        const error = JSON.parse(await response.text());
        console.log(error)
        setSubmitting(false);
        Swal.fire({
          title: "Error!",
          text: error.error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setSubmitting(false);
      Swal.fire({
        title: "Error!",
        text: "Some error occured while saving the Chama. Please try again.:",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  if (submitting) {
    return <p className="text-primary flex align-middle justify-center items-center h-screen">
      <br/>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#2563eb"
        radius="9"
        ariaLabel="saving-chama-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </p>;
  }

  return (
    <div className="w-full flex justify-center items-center ">
      <Card className="w-full md:w-4/5">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl flex items-center justify-center">
            Create a new Chama
          </CardTitle>
          <CardDescription>
            Fill this form to add you Chama details
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="chamaName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Name of the Chama *</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the Chama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Give a detailed description of the chama."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. a town, village or known area"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Public address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row">
                <FormField
                  control={form.control}
                  name="registered"
                  render={({ field }) => (
                    <FormItem className="space-y-3 flex flex-col md:w-1/2">
                      <FormLabel>Is the Chama Registered</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value); // Call field.onChange with the new value
                            const isRegisteredValue = value === "true";
                            setIsRegistered(isRegisteredValue); // Update state based on the value
                            // if (!isRegisteredValue) {
                            //   setCertificate(""); // Clear the certificate number if "No" is selected
                            // }
                          }}
                          defaultValue={field.value || "false"}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isRegistered && (
                  <FormField
                    control={form.control}
                    name="certificate"
                    render={({ field }) => (
                      <FormItem className="space-y-3 flex flex-col md:w-1/2">
                        <FormLabel>Enter Certificate Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g. BGVJNKMK4677VB"
                            {...field}
                            value={field.value || ""} // Ensure the value is always controlled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full">Create Chama</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddCBO;
