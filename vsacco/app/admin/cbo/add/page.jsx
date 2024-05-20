"use client";
import { useState, useEffect } from "react";
import styles from "./add.module.css";
import AddMembersForm from "./addMembers/page";
import CreateChamaForm from "./createChama/page";

const AddCBO = () => {
  const [isChamaCreated, setIsChamaCreated] = useState(false);

  useEffect(() => {
    const isCreated = sessionStorage.getItem("isChamaCreated") === "true";
    setIsChamaCreated(isCreated);
  }, []);

  const handleChamaCreated = (success) => {
    if (success) {
      setIsChamaCreated(true);
      sessionStorage.setItem("isChamaCreated", "true");
    }
  };

  const handleBack = () => {
    setIsChamaCreated(false);
    sessionStorage.removeItem("isChamaCreated");
  };

  return (
    <div className={styles.container}>
      {!isChamaCreated ? (
        <CreateChamaForm onChamaCreated={handleChamaCreated} />
      ) : (
        <div>
          <button onClick={handleBack}>Back</button>
          <AddMembersForm />
        </div>
      )}
    </div>
  );
};

export default AddCBO;
