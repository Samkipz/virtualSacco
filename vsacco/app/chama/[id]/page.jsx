"use client";
import styles from "./singleChama.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Chama = () => {
  const pathname = usePathname();
  const [chama, setChama] = useState(null);

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

  useEffect(() => {
    getChama();
  }, [pathname]);

  return (
    <div className={styles.container}>
      <h1>This is a test if it works</h1>
      {chama && <pre>{JSON.stringify(chama, null, 2)}</pre>}
    </div>
  );
};

export default Chama;
