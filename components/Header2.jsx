"use client";
import React, { useState, useEffect } from "react";
import styles from "./../styles/Header2.module.css";
const slides = [
  {
    title: "our first sharing menu",
    image:
      "https://global-uploads.webflow.com/60b6000ac2944e10375ce615/64258836dcaff4992dd6d579_Artboard%201%20copy-p-1080.jpg",
    h1Text1: "The BEst",
    h1Text2: "OF The Show",
  },
  {
    title: "big news london",
    button: "try your luck ! sign up",
    image:
      "https://global-uploads.webflow.com/60b6000ac2944e10375ce615/6495a4698c5090a3004e967d_large-Image7-p-1080.jpg",
    h1Text1: "convenent garden",
    h1Text2: "openning 12.07",
  },
  {
    title: "Careers at The Avocado Show",
    button: "JOIN OUR TEAM",
    h1Text1: "convenent garden",
    h1Text2: "openning 12.07",
    image:
      "https://global-uploads.webflow.com/60b6000ac2944e10375ce615/641309d1e41c11106b1e18e5_banner-newdish2-p-1080.jpg",
  },
  {
    title: "Share the avo love",
    button: "BUY GIFT CARD",
    h1Text1: "The BEst",
    h1Text2: "OF The Show",
    image:
      "https://global-uploads.webflow.com/60b6000ac2944e10375ce615/61f171009ba94a874c3aa3bf_Header%20We%27re%20Back%20V2-p-1600.jpeg",
  },
];
import { useTranslation } from "next-i18next";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation("common");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Adjust the interval time as needed (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);

  return (
    <>
      <div
        className={`${styles.container} ${styles.sliding}`}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className={styles.center}>
              <h1>{t("h1")}</h1>
              <p>{t("title")}</p>
              <p>{t("description")}</p>

              <div className={styles.welcome}>{slide.title}</div>
              <h1>{slide.h1Text1}</h1>
              <h1>{slide.h1Text2}</h1>
              <h1>{slide.h1Text3}</h1>
              {slide.button && (
                <span className={styles.button}>{slide.button}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
