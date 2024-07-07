"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./slider.module.css";

const HeroSlider = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [prevSlideIndex, setPrevSlideIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const totalSlides = 4; // Adjust based on actual number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      plusSlides(1);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slideIndex]);

  const plusSlides = (n) => {
    setPrevSlideIndex(slideIndex);
    let newIndex = slideIndex + n;
    if (newIndex > totalSlides) {
      newIndex = 1; // Loop back to the beginning
    } else if (newIndex < 1) {
      newIndex = totalSlides; // Loop to the end
    }
    setSlideIndex(newIndex);
  };

  // ------ handle toggle buttons ------ //
  const handleMouseOver = () => {
    setHovered(true);
  };
  const handleMouseOut = () => {
    setHovered(false);
  }
  

  return (
      <div className={styles.container}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`${styles.mySlides} ${
              i === slideIndex ? styles['slide-in-right'] : prevSlideIndex === i ? styles['slide-out-left'] : ""
            }`}
            style={{ display: i === slideIndex || i === prevSlideIndex ? "block" : "none" }}
          >
            <Image
              fill
              src={`/image${i}.jpg`} // Adjust the source based on images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt=""
              className={styles.bgImage}
              priority
            />
            <div className={styles.heroCenter}>
              <h1 className="flex text-white items-center justify-center">
                {i === 1
                  ? "Table banking is the future for today!"
                  : i === 2
                  ? "Together we can achieve more!"
                  : i === 3
                  ? "Start your Investment as early as now!"
                  : "Build your future with us"}
              </h1>
              <div className={styles.btnGrp}>
                <Link
                  href="/"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className={`${styles.btn} ${styles.btnMd} 
                  ${ hovered ? "text-white bg-none border-2 border-white" : "text-white bg-primary border-2 border-primary"}`}
                >
                  Learn More about us
                </Link>
                <Link
                  href="/"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className={`${styles.btn} ${styles.btnMd} 
                  ${ hovered ? "text-white bg-primary border-2 border-primary" : "text-white bg-none border-2 border-white"}`}
                >
                  Know our Services
                </Link>
              </div>
            </div>
          </div>
        ))}
        <span className={`${styles.prev} hover:text-primary `} onClick={() => plusSlides(-1)}>
          ❮❮
        </span>
        <span className={`${styles.next} hover:text-primary `} onClick={() => plusSlides(1)}>
          ❯❯
        </span>
      </div>
   
  );
};

export default HeroSlider;
