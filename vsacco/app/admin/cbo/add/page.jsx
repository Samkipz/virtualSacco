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

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const AddCBO = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AddCBO;
