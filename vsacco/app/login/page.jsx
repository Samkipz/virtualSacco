"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';
import { ImEnter } from "react-icons/im";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
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
        console.log("User logged in!");
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
