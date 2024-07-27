// "use client";
// import { useState, useEffect } from "react";
// import styles from "./add.module.css";
// import AddMembersForm from "./addMembers/page";
// import CreateChamaForm from "./createChama/page";

// const AddCBO = () => {
//   const [isChamaCreated, setIsChamaCreated] = useState(false);

//   useEffect(() => {
//     const isCreated = sessionStorage.getItem("isChamaCreated") === "true";
//     setIsChamaCreated(isCreated);
//   }, []);

//   const handleChamaCreated = (success) => {
//     if (success) {
//       console.log("New Chama created!");
//       // setIsChamaCreated(true);
//       // sessionStorage.setItem("isChamaCreated", "true");
//     }
//   };

//   const handleBack = () => {
//     setIsChamaCreated(false);
//     sessionStorage.removeItem("isChamaCreated");
//   };

//   return (
//     <div className={styles.container}>
//        <CreateChamaForm onChamaCreated={handleChamaCreated} />

//       {/* {!isChamaCreated ? (

//       ) : (
//         <div>
//           <button onClick={handleBack}>Back</button>
//           <AddMembersForm />
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default AddCBO;

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
import { toast } from "@/components/ui/use-toast";

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

  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 2));
    // sUBMIT LIKE SHOWN BELOW
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   for (const key in formData) {
  //     data.append(key, formData[key]);
  //   }

  //   try {
  //     const response = await fetch('/api/chama', {
  //       method: 'POST',
  //       body: data,
  //     });

  //     if (response.ok) {
  //       console.log("Chama created!");
  //       redirect('/admin/cbo');
  //     } else {
  //       console.error("Failed to create chama.");
  //     }
  //   } catch (error) {
  //     console.error("Some error occured chama:", error);
  //   }
  // };

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
