"use client";
import styles from "./singleChama.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { joinChama } from "@/app/lib/actions/joinChama";

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

  const handleSubmit = async (e) =>{
    e.preventDefault();
    joinChama(chama);
    
  }

  return (
    <div className={styles.container}>
      {chama && 
      <div className={styles.titleArea}>
          <h1>{chama.name}</h1>
          <form onSubmit={handleSubmit} className={styles.joinForm}>
            <button type="submit" className={styles.joinBtn}>Join</button>
          </form>
      </div>
      }
    </div>
  );
};

export default Chama;
