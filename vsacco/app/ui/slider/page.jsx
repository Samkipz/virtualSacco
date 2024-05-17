"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./slider.module.css";

const HeroSlider = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const totalSlides = 3; // Assuming there are 3 slides, adjust this based on your actual number of slides

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  function plusSlides(n) {
    const newIndex = slideIndex + n;
    if (newIndex >= 1 && newIndex <= totalSlides) {
      setSlideIndex(newIndex);
    } else if (newIndex > totalSlides) {
      setSlideIndex(1); // Loop back to the beginning
    } else {
      setSlideIndex(totalSlides); // Loop to the end
    }
  }

  function currentSlide(n) {
    setSlideIndex(n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName(styles.mySlides);
    if (n > slides.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(slides.length);
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={`${styles.mySlides} ${styles.fade}`}>
          <Image
            fill
            src="/image5.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
            className={styles.bgImage}
            priority
          />
          <div className={styles.heroCenter}>
            <h1>Table banking is the future for today!</h1>
            <div className={styles.btnGrp}>
              <Link href='/' className={`${styles.btn} ${styles.btnMd} ${styles.btnPrimary}`}> Learn More about us</Link>
              <Link href='/' className={`${styles.btn} ${styles.btnMd} ${styles.btnPrimary}`}> Know our Services</Link>
            </div>
          </div>
        </div>

        <div className={`${styles.mySlides} ${styles.fade}`}>
          <div className={styles.numbertext}>1 / {totalSlides}</div>
          <Image
            fill
            src="/image5.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
            className={styles.bgImage}
            priority
          />
          <div className={styles.text}>Caption Text 2</div>
        </div>

        <div className={`${styles.mySlides} ${styles.fade}`}>
          <div className={styles.numbertext}>1 / {totalSlides}</div>
          <Image
            fill
            src="/image5.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
            className={styles.bgImage}
            priority
          />
          <div className={styles.text}>Caption Text 3</div>
        </div>

        <span className={styles.prev} onClick={() => plusSlides(-1)}>
          ❮❮
        </span>
        <span className={styles.next} onClick={() => plusSlides(1)}>
          ❯❯
        </span>
      </div>
      <p>Some footer Content</p>
    </div>
  );
};

export default HeroSlider;
