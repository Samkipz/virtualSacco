import { useState, useEffect } from "react";
import styles from "./createchama.module.css";
import { redirect } from "next/navigation";
// import { createChama } from "@/app/lib/actions/createChama";

const CreateChamaForm = ({ onChamaCreated }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    chama_name: "",
    description: "",
    location: "",
    address: "",
    certificate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('/api/chama', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log("Chama created!");
        redirect('/admin/cbo');
      } else {
        console.error("Failed to create chama.");
      }
    } catch (error) {
      console.error("Some error occured chama:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Name of the Chama</label>
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Name of the Chama"
            name="chama_name"
            value={formData.chama_name}
            onChange={handleChange}
            required
          />
        </div>

        <label className={styles.label}>Description</label>
        <div className={styles.inputArea}>
          <textarea
            placeholder="Give a detailed description of the chama"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.halfWidth}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. a town, county or known area"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.halfWidth}>
            <label className={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.inputArea}>
          <div className={styles.halfWidth}>
            <div className={styles.checkboxToreveal}>
              <div className={styles.checboxLabel}>Is the chama registered?</div>
              <div className={styles.checkboxOption}>
                <input
                  type="radio"
                  id="yesRegistered"
                  name="registered"
                  value="true"
                  checked={isRegistered === true}
                  onChange={() => setIsRegistered(true)}
                />
                <label htmlFor="yesRegistered">Yes</label>
                <input
                  type="radio"
                  id="noRegistered"
                  name="registered"
                  value="false"
                  checked={isRegistered === false}
                  onChange={() => setIsRegistered(false)}
                />
                <label htmlFor="noRegistered">No</label>
              </div>
            </div>
          </div>
          <div className={styles.halfWidth}>
            {isRegistered && (
              <div>
                <label className={styles.label}>Enter the certificate registration number</label>
                <input
                  type="text"
                  name="certificate"
                  placeholder="e.g. DFR6772GV22S55"
                  value={formData.certificate}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default CreateChamaForm;
