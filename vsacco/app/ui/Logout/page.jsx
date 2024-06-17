"use client";
import styles from "./logoutButton.module.css"; // Assuming you have some styles
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // await signOut();
    // await signOut(); // Redirect to the home page after logout

    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        body: "",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User logged out!");
        router.push("/");
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
