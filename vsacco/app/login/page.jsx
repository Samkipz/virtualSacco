"use client";
import React, { useEffect, useState } from 'react';
import styles from './loginPage.module.css';
import Link from 'next/link';
import { ImEnter } from "react-icons/im";
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idNum: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = response;
        console.log("User logged in!");

        if (data.isAdmin) {
          router.push("/admin");
          router.refresh();
        } else {
          router.push("/profile");
          router.refresh();
        }
      } else {
        console.error("Failed to log in.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <form onSubmit={handleSubmit} className={styles.formSection}>
          <div className={styles.col}>
            <h2 className={styles.h2}>Login</h2>
            <div className={styles.inputArea}>
              <input
                type="number"
                name="idNum"
                placeholder="ID/Passport Number"
                value={formData.idNum}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputArea}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.submitBtn}>
              <div className={styles.formGrp}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type='submit' className={styles.submitButton}><ImEnter /> Login</button>
              <div className={styles.registerLink}>
                Dont have an account? <Link href="/register">Register here</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
