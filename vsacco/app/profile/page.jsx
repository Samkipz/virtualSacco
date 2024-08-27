import Link from "next/link";
import Image from "next/image";
import {
  MdCheckCircle,
  MdOutlinePending,
  MdLockClock,
  MdOutlineWarningAmber,
} from "react-icons/md";
import {
  CircleCheck,
  CircleEllipsis,
  SquareCheck,
  TriangleAlert,
} from "lucide-react";
import { auth } from "../api/auth/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import prisma from "../lib/prisma";
// import {Input, Label, Button } from "@/components/ui/input";

const Profile = async () => {
  const session = await auth();
  const userIdNum = session.idNum;

  const user = await prisma.user.findUnique({
    where: {
      idNum: userIdNum,
    },
    include: {
      user_has_chama: {
        include: {
          chama: true,
        },
      },
    },
  });

  const currentTime = Date.now();
  console.log("Current Time is === ", currentTime);

  // Dummy data for demonstration
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "0712345678",
    dob: "1990-01-01",
    cbos: [
      { name: "CBO One", role: "Member", status: "Active" },
      { name: "CBO Two", role: "Admin", status: "Pending" },
      { name: "CBO Three", role: "Member", status: "Revoked" },
    ],
    saccos: [
      { name: "Sacco One", role: "Member", status: "approved" },
      { name: "Sacco Two", role: "Admin", status: "pending" },
      { name: "Sacco Three", role: "Member", status: "revoked" },
    ],
    events: [{ name: "Event One", date: "2024-06-15" }],
    finances: {
      balance: "10000",
      contributions: "200000",
    },
    loans: [
      { name: "Loan One", amount: "200", status: "paid" },
      { name: "Loan Two", amount: "300", status: "ongoing" },
      { name: "Loan Three", amount: "800", status: "overdue" },
    ],
    otherCbos: [{ name: "CBO Four" }, { name: "CBO Five" }],
  };

  return (
    <div className="flex flex-wrap gap-3 p-6">
      {/* Top Row */}
      <div className="w-full flex lg:flex-row flex-wrap lg:flex-nowrap flex-grow gap-3">
        {/* Avator card */}
        <Card className="md:w-1/3">
          <CardHeader>
            <Image
              src="/noavatar.png"
              alt="profile pic"
              width="200"
              height="200"
              className="rounded-full mx-auto"
            />
            <CardTitle className="text-center mt-4">
              {user.firstname} {user.othernames}
            </CardTitle>
            <CardDescription className="text-center">
              {user.email}
            </CardDescription>
            <Link
              href="#"
              className="block mt-4 text-center text-blue-600 hover:underline"
            >
              Edit Profile
            </Link>
          </CardHeader>
        </Card>

        {/* User Info Card */}
        <Card className="md:w-2/5">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p>
                  {user.firstname} {user.othernames}
                </p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{user.email}</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p>
                  {user.phone1} / {user.phone2}
                </p>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <p>{userData.dob}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Info Card */}
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>My Total Chama Contributions</Label>
                <div className="bg-red-100 p-3 rounded-md">
                  <h4 className="text-red-600 text-center text-xl">
                    {userData.finances.contributions} KES
                  </h4>
                </div>
              </div>
              <div>
                <Label>My Total Sacco Contributions</Label>
                <div className="bg-red-100 p-3 rounded-md">
                  <h4 className="text-red-600 text-center text-xl">
                    {userData.finances.contributions} KES
                  </h4>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Rows */}
      <div className="w-full flex flex-wrap lg:flex-nowrap flex-row flex-grow gap-3">
        <div className="flex flex-wrap gap-3 lg:flex-col md:w-1/2">
          {/* Chama Membership Table Card */}
          <Card className="mt-3">
            <CardHeader>
              <CardTitle>Chama Memberships</CardTitle>
              <Link href="/#" className="text-blue-600 hover:underline">
                Explore Chamas
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.user_has_chama.length ? (
                  <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="border border-gray-200 p-2">#</th>
                        <th className="border border-gray-200 p-2">Name</th>
                        <th className="border border-gray-200 p-2">Role</th>
                        <th className="border border-gray-200 p-2">Status</th>
                        <th className="border border-gray-200 p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.user_has_chama.map((chama, index) => (
                        <tr key={index} className="border border-gray-200">
                          <td className="border border-gray-200 p-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-200 p-2">
                            {chama.chama.name}
                          </td>
                          <td className="border border-gray-200 p-2">
                            {chama.role}
                          </td>
                          <td className="border border-gray-200 p-2">
                            <div
                              className={`flex items-center gap-2 ${
                                chama.status === "approved"
                                  ? "text-green-600"
                                  : chama.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {chama.status === "approved" ? (
                                <SquareCheck />
                              ) : chama.status === "pending" ? (
                                <CircleEllipsis />
                              ) : (
                                <TriangleAlert />
                              )}
                              {chama.status.charAt(0).toUpperCase() +
                                chama.status.slice(1)}
                            </div>
                          </td>
                          <td className="border border-gray-200 p-2">
                            <Link
                              href={`/profile/chama/${encodeURIComponent(
                                chama.chama.id
                              )}`}
                              className="text-blue-600 hover:underline"
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <span className="block mt-4 text-red-600">
                    You have not joined any Chama. Click explore Chamas button
                    above to browse and join chamas
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Sacco Membership Table Card */}
          <Card className="mt-3">
            <CardHeader>
              <CardTitle>Sacco Memberships</CardTitle>
              <Link href="/#" className="text-blue-600 hover:underline">
                Explore Sacco
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="border border-gray-200 p-2">#</th>
                      <th className="border border-gray-200 p-2">Name</th>
                      <th className="border border-gray-200 p-2">Role</th>
                      <th className="border border-gray-200 p-2">Status</th>
                      <th className="border border-gray-200 p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.saccos.map((sacco, index) => (
                      <tr key={index} className="border border-gray-200">
                        <td className="border border-gray-200 p-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-200 p-2">
                          {sacco.name}
                        </td>
                        <td className="border border-gray-200 p-2">
                          {sacco.role}
                        </td>
                        <td className="border border-gray-200 p-2">
                          <div
                            className={`flex items-center gap-2 ${
                              sacco.status === "approved"
                                ? "text-green-600"
                                : sacco.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {sacco.status === "approved" ? (
                              <SquareCheck />
                            ) : sacco.status === "pending" ? (
                              <CircleEllipsis />
                            ) : (
                              <TriangleAlert />
                            )}
                            {sacco.status.charAt(0).toUpperCase() +
                              sacco.status.slice(1)}
                          </div>
                        </td>
                        <td className="border border-gray-200 p-2">
                          <Link
                            href={`/profile/sacco/${encodeURIComponent(
                              sacco.name
                            )}`}
                            className="text-blue-600 hover:underline"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap gap-3 lg:flex-col md:w-1/2">
          {/* Loans Card */}
          <Card className="mt-3">
            <CardHeader>
              <CardTitle>My Loans</CardTitle>
              <Link href="/#" className="text-blue-600 hover:underline">
                Request Loan
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-2">No.</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Chama/Sacco</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.loans.map((loan, index) => (
                      <tr key={index} className="border border-gray-200">
                        <td className="border border-gray-200 p-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-200 p-2">
                          {loan.name}
                        </td>
                        <td className="border border-gray-200 p-2">
                          {loan.amount}
                        </td>
                        <td className="border border-gray-200 p-2">
                          Chama - {loan.name}
                        </td>
                        <td className="border border-gray-200 p-2">
                          <div
                            className={`flex items-center gap-2 ${
                              loan.status === "paid"
                                ? "text-green-600"
                                : loan.status === "ongoing"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {loan.status === "paid" ? (
                              <SquareCheck />
                            ) : loan.status === "ongoing" ? (
                              <CircleEllipsis />
                            ) : (
                              <TriangleAlert />
                            )}
                            {loan.status.charAt(0).toUpperCase() +
                              loan.status.slice(1)}
                          </div>
                        </td>
                        <td className="border border-gray-200 p-2">
                          <Link
                            href={`/profile/loan/${encodeURIComponent(
                              loan.name
                            )}`}
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                {userData.events.map((event, index) => (
                  <li key={index}>
                    {event.name} - {event.date}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
