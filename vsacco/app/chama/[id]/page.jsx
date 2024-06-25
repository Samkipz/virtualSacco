"use client";
import styles from "./singleChama.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { joinChama } from "@/app/lib/actions/joinChama";
import { getUser } from "@/app/lib/actions/getUser";

const Chama = () => {
  const pathname = usePathname();
  const [chama, setChama] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");

  //get the current chama using API endpoint /api/chama-id
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

  //get the current logged in user
  const loggedInUser = async () =>{
    const fetchUser = await getUser();
    setUser(fetchUser);
  }

  useEffect(() => {
    getChama();
    loggedInUser();
  }, [pathname]); // pathname as dependencies

  useEffect(() => {
    if (chama && user) {
      let userStatus; //Variable to track whether current user belongs to current chama (membership status)
      
      //check if the current user is in the "user has chama" table. 
      //If so get the membership status
      chama.user_has_chama.forEach(member => {
        if (parseInt(member.user_id) === parseInt(user.userId)) {
          userStatus = member.status;
        }
      });

      //Update membership status on the DOM.
      setMembershipStatus(userStatus);
    }
  }, [chama, user]); // chama and user as dependencies

  const handleCancel = async (e) => {
    e.preventDefault();
    //handle canceling
    console.log("Cancel clicked!");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await joinChama(chama);
    setMessage(result.message);
  };

  return (
    <div className={styles.container}>
      {chama &&
        <div className={styles.titleArea}>
          <h1>{chama.name}</h1>
          <form onSubmit={handleSubmit} className={styles.joinForm}>
            {membershipStatus ? (
              membershipStatus === 'pending' ? 
              <span className={styles.statusSection}> 
                <span className={`${styles.Btn} ${styles.pendingBtn}`}>
                  Membership Pending
                </span>
                <span className={`${styles.Btn} ${styles.cancelBtn}`} onClick={handleCancel}> &#x2715; </span>
              </span>
                   :
              membershipStatus === 'approved' ? <span className={`${styles.Btn} ${styles.approvedBtn}`}>Membership Active</span>:
              membershipStatus === 'revoked' ? <span className={`${styles.Btn} ${styles.revokedBtn}`}>Membership Revoked</span>: undefined)
              :
              <button type="submit" className={`${styles.Btn} ${styles.joinBtn}`}>Join</button>}
          </form>
        </div>
      }
      {message && <p>{message}</p>}
    </div>
  );
};

export default Chama;
