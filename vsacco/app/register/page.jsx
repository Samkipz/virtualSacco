"use client";
import React, { useState } from 'react';
import styles from './registerPage.module.css';
import Link from 'next/link';
import { ImEnter } from "react-icons/im";
import FileUpload from '../ui/fileUpload/page';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    othernames: '',
    gender: '',
    dob: '',
    idFile: null,
    avatarFile: null,
    email: '',
    phone1: '',
    phone2: '',
    password1: '',
    password2: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log("User created!");
      } else {
        console.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formSection}>
          <div className={`${styles.col} ${styles.left}`}>
            <h2 className={styles.h2}>General Information</h2>
            <div className={styles.inputArea}>
              <div className={styles.halfWidth}>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.halfWidth}>
                <input
                  type="text"
                  name="othernames"
                  placeholder="Last Name"
                  value={formData.othernames}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.inputArea}>
              <div className={styles.halfWidth}>
                <select name="gender" className={styles.dropdown} value={formData.gender} onChange={handleChange} required>
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.halfWidth}>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.uploadID}>
              <label>Upload National ID</label>
              <FileUpload/>
            </div>
          </div>
          <div className={`${styles.col} ${styles.right}`}>
            <h2 className={styles.h2}>Contact Details</h2>
            <div className={styles.inputArea}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputArea}>
              <div className={styles.halfWidth}>
                <input
                  type="text"
                  name="phone1"
                  placeholder="Phone number e.g. 0712345678"
                  value={formData.phone1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.halfWidth}>
                <input
                  type="text"
                  name="phone2"
                  placeholder="Alternative Phone number"
                  value={formData.phone2}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.inputArea}>
              <div className={styles.halfWidth}>
                <input
                  type="password"
                  name="password1"
                  placeholder="Enter password"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.halfWidth}>
                <input
                  type="password"
                  name="password2"
                  placeholder="Repeat password"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.submitBtn}>
              <div className={styles.terms}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="terms">I do accept the <Link href="#">Terms and Conditions</Link> of this site.</label>
              </div>
              <button type='submit' className={styles.submitButton}><ImEnter /> Register</button>
              <div className={styles.loginLink}>
                Already have an account? <Link href="/login">Login here</Link>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default Register;
