"use client"
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleArrowDown, CircleArrowUp, FolderSync, WalletMinimal } from "lucide-react";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/api/auth/auth";
import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/actions/getUser";
import { fetchChama, getUsersChama } from "@/app/lib/actions/fetchChama";

const ChamaProfile = ({ params }) => {
  const [chama, setChama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const chamaId = parseInt(params.chama);

  const getChamaDetails = async (chamaId) => {
    const fetchedChama = await getUsersChama(chamaId)
    setChama(fetchedChama);
    setLoading(false); // Set loading to false after fetching data
  };

  useEffect(() => {
    getChamaDetails(chamaId);
  }, [chamaId]);

  if (chama) console.log("User Details for this Chama:+++====>, ", JSON.stringify(chama, null, 2));

  // Dummy data for demonstration; replace with actual data
  const chamaData = {
    dateJoined: "22/4/2024",
    role: "Member",
    totalMembers: 400,
    totalContribution: 600,
    recentTransactions: [
      {
        date: "2024-06-15",
        amount: "1000",
        transactionCode: "TXN001",
        transactionCategory: "Deposit",
        transactionReason: "Monthly Contribution",
        transactionChannel: "Bank",
        transactionDate: "2024-06-15",
        status: "Completed",
      },
      // More transactions...
    ],
  };


//   {
//     "message": "Wallet retrieved",
//     "data": {
//         "wallet_id": "YDVWGDY",
//         "label": "Eve-Wallet",
//         "can_disburse": true,
//         "currency": "KES",
//         "wallet_type": "WORKING",
//         "current_balance": 5,
//         "available_balance": 5,
//         "updated_at": "2024-07-05T13:56:21.142460+03:00"
//     }
// }

const handleGetBalance = async (wallet_id) => {
  try {
    const response = await fetch(`/api/instasend/wallets/fetchone?wallet_id=${wallet_id}`);
    if (response.ok) {
      const { data } = await response.json();
      setBalance(data);
      const currentBalance = balance.current_balance;
      const availableBalance = balance.available_balance;
      const currency = balance.currency;
      
    } else {
      console.error('Failed to fetch wallet data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  useEffect(() => {
    if(chama){
      const wallet_id = chama.data.userChama.wallet_id;
      handleGetBalance(wallet_id);
    }
  }, [chama]);

  if (loading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 p-6">
      {/* Chama Info and Actions */}
      <div className="w-full flex lg:flex-row flex-wrap lg:flex-nowrap flex-grow gap-3">
        {/* Chama Info Card */}
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Chama Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Date Joined</Label>
                <p>{chamaData.dateJoined}</p>
              </div>
              <div>
                <Label>Role</Label>
                <p>{chamaData.role}</p>
              </div>
              <div>
                <Label>Total Members</Label>
                <p>{chamaData.totalMembers}</p>
              </div>
              <div>
                <Label>My Total Contribution</Label>
                <p>KES. {chamaData.totalContribution}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 md:w-2/3">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
              Members
            </Button>
            <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
              Events
            </Button>
            <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
              Blogs
            </Button>
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex gap-3">
                  <WalletMinimal className="h-6 w-6 mr-2" />
                  Account Balance
                </div>
                <div className="flex gap-3">Wallet ID: eee</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-2 border-b">
                {!chama.data.userChama.wallet_id ? 
                 "You do Not Have a wallet ID. Probably, Your membership for this Chama is not active. Conduct admin"
                : 
                balance ? 
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{balance.currency}.</span> {balance.current_balance}
                </h1>
                : <span className="text-red-600 font-bold"> Loading balance... </span>}
              </div>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
                      <CircleArrowDown className="h-6 w-6 mr-2" />
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Withdraw From Your Wallet</DialogTitle>
                      <DialogDescription>
                        The minimum withdrawable amount is KES. 20.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Enter Amount
                        </Label>
                        <Input type="number" id="username" name="amount" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Withdraw</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
                  <CircleArrowUp className="h-6 w-6 mr-2" />
                  Deposit
                </Button>
                <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
                  <FolderSync className="h-6 w-6 mr-2" />
                  Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Loan Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
                  <CircleArrowUp className="h-6 w-6 mr-2" />
                  Request Loan
                </Button>
                <Button variant="outline" className="flex-grow hover:bg-primary hover:text-white">
                  <CircleArrowDown className="h-6 w-6 mr-2" />
                  Repay Loan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>My Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-200 p-2">Date</th>
                  <th className="border border-gray-200 p-2">Amount</th>
                  <th className="border border-gray-200 p-2">Transaction Code</th>
                  <th className="border border-gray-200 p-2">Category</th>
                  <th className="border border-gray-200 p-2">Reason</th>
                  <th className="border border-gray-200 p-2">Channel</th>
                  <th className="border border-gray-200 p-2">Transaction Date</th>
                  <th className="border border-gray-200 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {chamaData.recentTransactions.map((transaction, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="border border-gray-200 p-2">{transaction.date}</td>
                    <td className="border border-gray-200 p-2">{transaction.amount}</td>
                    <td className="border border-gray-200 p-2">{transaction.transactionCode}</td>
                    <td className="border border-gray-200 p-2">{transaction.transactionCategory}</td>
                    <td className="border border-gray-200 p-2">{transaction.transactionReason}</td>
                    <td className="border border-gray-200 p-2">{transaction.transactionChannel}</td>
                    <td className="border border-gray-200 p-2">{transaction.transactionDate}</td>
                    <td className="border border-gray-200 p-2">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChamaProfile;
