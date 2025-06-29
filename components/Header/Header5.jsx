import React from 'react'
import styles from '../../styles/Header/Header5.module.css'

const Header5 = () => {
    return (
        <section className={styles.heroSection}>
      {/* Left cultural image placeholder */}
      <div
        className={`${styles.heroCulturalImage} ${styles.heroCulturalImageLeft}`}
        style={{
          backgroundImage: 'url("https://placehold.co/650x850/784128/965C3B?text=Terracotta+Warrior")',
        }}
      ></div>

      {/* Right cultural image placeholder */}
      <div
        className={`${styles.heroCulturalImage} ${styles.heroCulturalImageRight}`}
        style={{
          backgroundImage: 'url("https://placehold.co/450x550/784128/965C3B?text=Ancient+Artifact")',
        }}
      ></div>

      {/* Central Content Block */}
      <div className={styles.heroContentBlock}>
        <h1 className={`${styles.heroTitle} animate-fade-in-down`}>
          Discover the Essence of Shanxii
        </h1>
        <p className={`${styles.heroSubtitle} animate-fade-in-up`}>
          Explore Unique Products & Authentic Experiences.
        </p>
        <a href="#products" className={styles.heroButton}>
          Shop Now
          {/* <ChevronRight className={styles.iconMl} /> */}
        </a>
      </div>
    </section>
    )
}

export default Header5
