"use client";
import styles from "./singleChama.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cancelRequest, joinChama } from "@/app/lib/actions/joinChama";
import { getUser } from "@/app/lib/actions/getUser";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Chama = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [chama, setChama] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");

  // ============== get the current chama using API endpoint /api/chama-id ======//
  const getChama = async () => {
    const chamaId = pathname.split("/").pop();

    try {
      const response = await fetch(`/api/chama?id=${chamaId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setChama(data);
      } else {
        console.error("Failed to fetch chama. Status:", response.status);
      }
    } catch (error) {
      console.error("Some error occurred when fetching chama:", error);
    }
  };

  //============ get the current logged in user =================//
  const loggedInUser = async () => {
    const fetchUser = await getUser();
    setUser(fetchUser);
  };

  useEffect(() => {
    getChama();
    loggedInUser();
  }, [pathname]); // pathname as dependencies

  useEffect(() => {
    if (chama && user) {
      let userStatus; //does the current user belongs to current chama (membership status)

      //check if the current user is in the "user has chama" table.
      //If so get the membership status
      chama.user_has_chama.forEach((member) => {
        if (parseInt(member.user_id) === parseInt(user.userId)) {
          userStatus = member.status;
        }
      });

      //Update membership status on the DOM.
      setMembershipStatus(userStatus);
    }
  }, [chama, user]); // chama and user as dependencies

  // =============== Cancel Join Request ============//
  const handleCancel = async () => {
    if (chama && user) {
      console.log(
        "Cancel clicked! for chama id - ",
        chama.id,
        " and user id - ",
        user.userId
      );
      await Swal.fire({
        title: "Cancel Membership request",
        text: "Do you really want to cancel your request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const response = cancelRequest(chama.id, user.userId);
          if (response) {
            setMembershipStatus("");
            setMessage(response.message);
            Swal.fire({
              title: "Deleted!",
              text: "Your request has been deleted.",
              icon: "success",
            });
          }
        }
      });
    }
  };

  // =========  Join ======= //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await joinChama(chama);
    console.log("Result is -->", result.success);
    if (result.success) {
      setMembershipStatus("pending");
      Swal.fire({
        title: "Not loged in",
        text: result.message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
    setMessage(result.message);
  };

  return (
    <div className="container max-w-7xl pt-12 w-full">
      {chama && (
        <div className="flex flex-col">
          <div className="mb-2 flex flex-wrap w-full justify-between">
            <h2 className="mb-2 mt-4 text-xl font-bold">{chama.name}</h2>
            <form onSubmit={handleSubmit}>
              {
                membershipStatus ? (
                  membershipStatus === "pending" ? (
                    <span className="flex flex-row whitespace-nowrap gap-0">
                      <span
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors 
                      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                      disabled:opacity-50 h-9 px-4 py-2 border rounded-l bg-yellow-500 text-white"
                      >
                        Membership Pending
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-r text-sm font-medium 
                            transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                            disabled:opacity-50 bg-background shadow-sm hover:bg-red-600 hover:text-white cursor-pointer h-9 
                            px-4 py-2 border border-red-500"
                              onClick={() => {
                                handleCancel(chama);
                              }}
                            >
                              &#x2715;
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cancel membership</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  ) : membershipStatus === "approved" ? (
                    <span
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                  disabled:opacity-50 h-9 px-4 py-2 border rounded bg-green-500 text-white"
                    >
                      Membership Active
                    </span>
                  ) : membershipStatus === "revoked" ? (
                    <span
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                  disabled:opacity-50 h-9 px-4 py-2 border rounded bg-red-500 text-white"
                    >
                      Membership Active
                    </span>
                  ) : undefined
                ) : (
                  <Button
                    variant="outline"
                    className="border-green-600 hover:text-white hover:bg-green-600"
                  >
                    Join this chama
                  </Button>
                )
                // <button type="submit" className="border-2 border-green-500 cursor-pointer">Join</button>
              }
            </form>
          </div>
          <div>{chama.description}</div>
        </div>
      )}
    </div>
  );
};

export default Chama;
