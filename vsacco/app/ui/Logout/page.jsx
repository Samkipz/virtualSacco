"use client";
import { signOut } from "@/app/api/auth/auth";
import styles from "./logoutButton.module.css"; // Assuming you have some styles

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut();
    // await signOut(); // Redirect to the home page after logout
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
