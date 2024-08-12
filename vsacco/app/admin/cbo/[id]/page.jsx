// "use client"
// import { fetchChama } from "@/app/lib/actions/fetchChama";
// import styles from "./chamaId.module.css";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { approveRequest } from "@/app/lib/actions/joinChama";

// import useSWR from "swr";
// import { ThreeDots } from "react-loader-spinner";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// const SingleChama = () => {
//   // const [Chama, setChama] = useState(null);
//   const pathname = usePathname();

//   const chamaId = parseInt(pathname.split("/").pop());
//   console.log("====>",chamaId);
//   const { data, error, isLoading } = useSWR(`/api/chama?id=KSh. {chamaId}`, fetcher);

//   // const getChama = async (chamaId) =>{
//   //   const fetchedChama = await fetchChama(chamaId);
//   //   setChama(fetchedChama);
//   // }

//   // useEffect(()=>{
//   //   getChama(chamaId);
//   // },[chamaId])

//   // if(Chama) console.log('======>>',JSON.stringify(Chama,null,2));

//   // ----------- Other Functions to handle page events ------ //
//   const handleApprove = async (chamaId, userId)=> {
//     //handle accept
//     // alert("chama -"+ chamaId+" user - "+ userId);
//     const response = await approveRequest(chamaId, userId);
//     console.log("====>",response);
//     if (response){
//       alert(response.message);
//     }
//   }

//   const chama = data
//   console.log("====> Chama", chama);

//   if (error) return <div>failed to load</div>;
//   if (isLoading) {
//     return <div className="text-primary flex align-middle justify-center items-center h-screen">
//       <ThreeDots
//         visible={true}
//         height="80"
//         width="80"
//         color="#2563eb"
//         radius="9"
//         ariaLabel="chama-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//       />
//     </div>;
//   }

//   return (
//     <div className={styles.container}>
//        <>
//        <div className={styles.cardsCircleRow}>
//         <div className={styles.cardsColumn}>

//           <div className={styles.titleRow}>
//               <h1 className="text-3xl font-bold underline">
//                 {chama.name}
//               </h1>
//               <Dialog>
//                 <DialogTrigger>Open</DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Are you absolutely sure?</DialogTitle>
//                     <DialogDescription>
//                       This action cannot be undone. This will permanently delete your account
//                       and remove your data from our servers.
//                     </DialogDescription>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>

//           </div>
//           <div className={styles.cardsRow}>
//             <div className={styles.card}>
//               <h3>Members</h3>
//               <p>Total: 8</p>
//             </div>
//             <div className={styles.card}>
//               <h3>Contribution</h3>
//               <p>KShs. 200000</p>
//             </div>
//             <div className={styles.card}>
//               <h3>Events</h3>
//               <p>2 Upcoming this month</p>
//             </div>
//           </div>
//         </div>

//         <div className={styles.circlesBtnColumn}>
//           <div className={styles.BtnsRow}>
//               <button className={styles.button}>Contributions</button>
//               <button className={styles.button}>Edit Chama</button>
//               <button className={styles.button}>Create Event</button>
//               <button className={styles.button}>Post a blog</button>
//           </div>

//           <div className={styles.circlesRow}>
//             <div className={styles.circle}>
//               <h4>KShs. 20000</h4>
//               <p>Total Loans</p>
//             </div>
//             <div className={styles.circle}>
//               <h4 className={styles.h4}>KShs. 100000</h4>
//               <p>Total Contribution</p>
//             </div>
//           </div>

//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <h3>Recent Members</h3>

//           <table  className={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Full Names</th>
//               <th>Id Number</th>
//               <th>Id File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//           {chama.user_has_chama.length ? chama.user_has_chama.map((user, index) =>(
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{user.user.firstname} {user.user.othernames}</td>
//               <td>{user.user.idNum}</td>
//               <td>
//                 {/* <a href="/path/to/file/sample.pdf" download>
//                   sample.pdf
//                 </a> */}
//                 <a
//                   href={`data:image/jpeg;base64,KSh. {user.user.idFile}`}
//                   download={`KSh. {user.user.firstname}_ID.jpg`}
//                   className={styles.userDoc}
//                 >
//                   Download {user.user.firstname} ID File
//                 </a>
//               </td>
//               <td>
//               <div className={styles.BtnsRow}>
//                   <button onClick={()=>handleApprove(Chama.id, user.user.id)} className={styles.button}>Accept</button>
//                   <button className={styles.button}>Decline</button>
//                   <button className={styles.button}>View</button>
//                 </div>
//               </td>
//             </tr>
//             )) : undefined}
//           </tbody>
//         </table>

//       </div>

//       <div className={styles.tableContainer}>
//         <h3>Recent Transactions</h3>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Full Names</th>
//               <th>Transaction Type</th>
//               <th>Transaction Category</th>
//               <th>Transaction Id</th>
//               <th>Transaction Date</th>
//               <th>Authorized By</th>
//               <th>View More Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>John Smith</td>
//               <td>Deposit</td>
//               <td>General Contribution</td>
//               <td>TX123456</td>
//               <td>2024-06-24</td>
//               <td>Admin</td>
//               <td>
//                 <button className={styles.button}>View</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//        </>

//     </div>
//   );
// };

// export default SingleChama;

// ----------------------------//
//     Shadcn Dashboard        //
// ---------------------------- //
"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Trash2,
  Users,
  View,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { ThreeDots } from "react-loader-spinner";
import { approveRequest } from "@/app/lib/actions/joinChama";
import { columns } from "./members/columns";
import { DataTable } from "./members/data-table";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SingleChama = () => {
  const pathname = usePathname();

  // fetch chama
  const chamaId = parseInt(pathname.split("/").pop());
  const {
    data: chama,
    error,
    isLoading,
  } = useSWR(`/api/chama?id=${chamaId}`, fetcher);
  // fetch chama members
  const {
    data: members,
    error: membersError,
    isLoading: LoadingMembers,
  } = useSWR(`/api/chama/members?id=${chamaId}`, fetcher);
  console.log("Members===>", members);

  // //get flat data to use in our tables
  // const flatMembers = members?.map(member => ({
  //   ...member,        // Spread the parent object (member)
  //   ...member.user    // Spread the nested 'user' object
  // }));
  // console.log("flatMembers===>", flatMembers);

  // Date formater
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  // Extract only specific fields in filteredMembers
  const filteredMembers = members?.map((member) => ({
    chama_id: member.chama_id,
    joinRequestDate: new Date(member.create_time).toLocaleDateString(
      undefined,
      options
    ),
    status: member.status,
    processedDate: member.update_time,
    registrationDate: member.user.create_time,
    dob: member.user.dob,
    email: member.user.email,
    firstname: member.user.firstname,
    isAdmin: member.user.isAdmin,
    othernames: member.user.othernames,
    gender: member.user.gender,
    user_id: member.user_id,
    idFile: member.user.idFile,
    idNum: member.user.idNum,
    phone1: member.user.phone1,
    phone2: member.user.phone2,
    wallet_label: member.wallet_label,
  }));

  console.log("filteredMembers===>", filteredMembers);

  if (error) return <div>failed to load</div>;
  if (isLoading) {
    return (
      <div className="text-primary flex align-middle justify-center items-center h-screen">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#2563eb"
          radius="9"
          ariaLabel="chama-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex justify-between h-16 items-center border-b bg-background px-4 md:px-6 ">
        <div className="flex md:w-auto items-start text-lg font-medium text-foreground capitalize">
          {chama.name}
        </div>
        <div className="hidden justify-between font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Contribution
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Events
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Members
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Edit
          </Link>
        </div>
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Contribution</DropdownMenuItem>
              <DropdownMenuItem>Events</DropdownMenuItem>
              <DropdownMenuItem>Members</DropdownMenuItem>
              <DropdownMenuItem>Blog</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Manage</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Contribution
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh. 45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Loans Requested
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh. 20,211.72</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Members</CardTitle>
                <CardDescription>
                  Recent requests to join this Chama.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/cbo/members">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Id/Passport No.</TableHead>
                    <TableHead>Doc</TableHead>
                    <TableHead>Date Joined</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead> */}
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers ? (
                    filteredMembers.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium capitalize">
                            {member.firstname} {member.othernames}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {member.email}
                          </div>
                        </TableCell>
                        <TableCell className="text-left">
                          {member.idNum}
                        </TableCell>
                        <TableCell className="text-left">
                          {member.idNum}
                        </TableCell>
                        <TableCell className="text-left">
                          {member.joinRequestDate}
                        </TableCell>
                        <TableCell className="text-left text-white capitalize">
                          {member.status === "approved" ? (
                            <Badge
                              className="text-xs bg-green-500"
                              variant="success"
                            >
                              {member.status}
                            </Badge>
                          ) : member.status === "pending" ? (
                            <Badge
                              className="text-xs bg-yellow-500"
                              variant="warning"
                            >
                              {member.status}
                            </Badge>
                          ) : (
                            <Badge className="text-xs" variant="destructive">
                              {member.status}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="flex justify-end gap-2">
                            <AlertDialog>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Trash2
                                        size={18}
                                        className="text-red-500 hover:cursor-pointer"
                                      />
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Remove Member</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <View
                                        size={18}
                                        className="text-blue-500 hover:cursor-pointer"
                                      />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-6xl h-4/5">
                                      <DialogHeader>
                                        <DialogTitle className="capitalize">{member.firstname} {member.othernames}</DialogTitle>
                                        <DialogDescription>
                                          Make changes to your profile here.
                                          Click save when you're done.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Name
                                          </Label>
                                          <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="username"
                                            className="text-right"
                                          >
                                            Username
                                          </Label>
                                          <Input
                                            id="username"
                                            defaultValue="@peduarte"
                                            className="col-span-3"
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button type="submit">
                                          Save changes
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                        </TableCell>

                        {/* <TableCell className="hidden xl:table-column">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">
                          KSh. 250.00
                        </TableCell> */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-right">
                        <div>No Members Available Here</div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+KSh. 1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+KSh. 39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+KSh. 299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+KSh. 99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+KSh. 39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex">Recent Transactions detailed</div>
      </main>
    </div>
  );
};

export default SingleChama;
