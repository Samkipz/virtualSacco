"use client";
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
import {
  CircleArrowDown,
  CircleArrowUp,
  FolderSync,
  WalletMinimal,
} from "lucide-react";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/api/auth/auth";
import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/actions/getUser";
import { fetchChama, getUsersChama } from "@/app/lib/actions/fetchChama";
import MaterialTable from "@/app/ui/table/page";

const ChamaProfile = ({ params }) => {
  const [chama, setChama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [depformData, setdepformData] = useState({ phone: "", depAmount: "" });
  const [withformData, setwithformData] = useState({ withAmount: "" });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const chamaId = parseInt(params.chama);

  const handleChangeDep = (e) => {
    const { name, value } = e.target;
    setdepformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeWith = (e) => {
    const { name, value } = e.target;
    setwithformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getChamaDetails = async (chamaId) => {
    const fetchedChama = await getUsersChama(chamaId);
    setChama(fetchedChama);
    setLoading(false); // Set loading to false after fetching data
  };

  useEffect(() => {
    getChamaDetails(chamaId);
  }, [chamaId]);

  // if (chama) console.log("User Details for this Chama:+++====>, ", JSON.stringify(chama, null, 2));

  const chamaData = {
    dateJoined: "22/4/2024",
    role: "Member",
    totalMembers: 400,
    totalContribution: 600,
    recentTransactions1: [
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
    ],
  };

  const handleGetWallet = async (wallet_label) => {
    try {
      const response = await fetch(
        `/api/instasend/wallets/fetchone?label=${wallet_label}`
      );
      if (response.ok) {
        const { data } = await response.json();
        setWallet(data);
      } else {
        console.error("Failed to fetch wallet data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getWalletTransactions = async (wallet_id) => {
    try {
      const response = await fetch(
        `/api/instasend/wallets/wallettrans?wallet_id=${wallet_id}`
      );
  
      if (response.ok) {
        const { data } = await response.json();
        
        // Filtering transactions that have an invoice
        const filteredTransactions = data.results
          .filter(transaction => transaction.invoice !== null)
          .map(transaction => ({
            invoice_id: transaction.invoice.invoice_id,
            provider: transaction.invoice.provider,
            account: transaction.invoice.account,
            currency: transaction.invoice.currency,
            net_amount: transaction.invoice.net_amount,
            charges: transaction.invoice.charges,
            state: transaction.invoice.state,
            mpesa_ref: transaction.invoice.mpesa_reference,
            api_ref: transaction.invoice.api_ref,
            created_at: transaction.invoice.created_at
          }));
  
        // Updating the state with filtered transactions
        console.log("Filtered Transactions-----", JSON.stringify(filteredTransactions, null, 2));
        setRecentTransactions(filteredTransactions);
      } else {
        console.error("Failed to fetch wallet data:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleDeposit = async (e) => {
    e.preventDefault();
    // console.log("dep form data ===> ", depformData);
    if (wallet && chama) {
      // get wallet id
      const walletId = wallet.wallet_id;
      const phoneSub = depformData.phone.substring(1);
      const phoneNumber = `254${phoneSub}`;
      const email = chama.data.user.email;
      const firstname = chama.data.firstname;
      const laststname = chama.data.othernames;
      const amount = depformData.depAmount;

      const data = {
        phone: phoneNumber,
        amount: amount,
        first_name: firstname,
        last_name: laststname,
        email: email,
        wallet_id: walletId,
      };

      try {
        const response = await fetch("/api/instasend/wallets/fundwallet", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("Deposit Request Send!");
        } else {
          console.error("Failed to create deposit request.");
        }
      } catch (error) {
        console.error("Some error occured when trying to deposit:", error);
      }
    } else {
      alert(
        "You need to be an approved member of this Chama for You to Deposit"
      );
    }
  };

  useEffect(() => {
    if (chama) {
      const wallet_label = chama.data.userChama.wallet_id;
      handleGetWallet(wallet_label);
    }
  }, [chama]);

  useEffect(() => {
    if (wallet) {
      getWalletTransactions(wallet.wallet_id);
    }
  }, [wallet]);
  // if (recentTransactions) {
  //   // console.log(
  //   //   "Recent Transactions-----",
  //   //   JSON.stringify(recentTransactions, null, 2)
  //   // );
  //   // const myData=recentTransactions
  //   // console.log("Recent Transactions-----", recentTransactions);
  // }
  // console.log("Recent Transactions-----", recentTransactions);

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
            <Button
              variant="outline"
              className="flex-grow hover:bg-primary hover:text-white"
            >
              Members
            </Button>
            <Button
              variant="outline"
              className="flex-grow hover:bg-primary hover:text-white"
            >
              Events
            </Button>
            <Button
              variant="outline"
              className="flex-grow hover:bg-primary hover:text-white"
            >
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
                <div className="flex gap-3">
                  Wallet ID:{" "}
                  {wallet ? wallet.label : <p>Wallet Unavailabele</p>}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-2 border-b">
                {!chama.data.userChama.wallet_id ? (
                  "You do Not Have a wallet. Probably, Your membership for this Chama is not active. Conduct admin"
                ) : wallet ? (
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {wallet.currency}.
                    </span>{" "}
                    {wallet.current_balance}
                  </h1>
                ) : (
                  <span className="text-red-600 font-bold">
                    {" "}
                    Loading balance...{" "}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-grow hover:bg-primary hover:text-white"
                    >
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
                        <Label htmlFor="withAmount" className="text-right">
                          Enter Amount
                        </Label>
                        <Input
                          type="number"
                          id="withAmount"
                          name="withAmount"
                          placeholder="100"
                          value={withformData.withAmount}
                          onChange={handleChangeWith}
                          required
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Withdraw</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-grow hover:bg-primary hover:text-white"
                    >
                      <CircleArrowDown className="h-6 w-6 mr-2" />
                      Deposit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Deposit to Your Wallet</DialogTitle>
                      <DialogDescription>
                        Please note that transaction charges applies.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDeposit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Enter Phone
                          </Label>
                          <Input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="07..."
                            value={depformData.phone}
                            onChange={handleChangeDep}
                            required
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="depAmount" className="text-right">
                            Enter Amount
                          </Label>
                          <Input
                            type="number"
                            id="depAmount"
                            name="depAmount"
                            placeholder="100"
                            value={depformData.depAmount}
                            onChange={handleChangeDep}
                            required
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Deposit</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="flex-grow hover:bg-primary hover:text-white"
                >
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
                <Button
                  variant="outline"
                  className="flex-grow hover:bg-primary hover:text-white"
                >
                  <CircleArrowUp className="h-6 w-6 mr-2" />
                  Request Loan
                </Button>
                <Button
                  variant="outline"
                  className="flex-grow hover:bg-primary hover:text-white"
                >
                  <CircleArrowDown className="h-6 w-6 mr-2" />
                  Repay Loan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="w-full flex flex-wrap gap-3">
        {/* Material Table */}
        <MaterialTable data={recentTransactions} />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      INVOICE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      PROVIDER
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ACCOUNT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CURRENCY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      AMOUNT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CHARGE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      MPESA REF
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      REASON
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions &&
                    recentTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          INV_{transaction.invoice.invoice_id || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.provider || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.account || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.currency || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.net_amount || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.charges || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.state || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.mpesa_ref || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.invoice.api_ref || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            transaction.invoice.created_at
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChamaProfile;
