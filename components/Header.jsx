import React, { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
const contents = [
  {
    image:
      'https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    image:
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    image:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    image:
      'https://images.pexels.com/photos/46212/men-s-shirt-shirt-attire-clothing-46212.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]
const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + contents.length) % contents.length
    setCurrentIndex(newIndex)
  }

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % contents.length
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    setTimeout(() => {
      goToNextSlide()
    }, 3000)
  })

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.left}
        style={{
          backgroundImage: `url("${contents[currentIndex].image}")`,
          backgroundSize: 'cover'
        }}
      >
        <h4>Do not Miss Out This Weekend Bonanza!</h4>
        <h1>ENJOY 20% OFF ON EVERYTHING</h1>
        <div className={styles.flex}>
          <div className={styles.btn}>Shop Footwear</div>
          <div className={styles.btn}>Shop Clothing</div>
        </div>
      </div>
      <div className={styles.right}>
        {[1, 2].map((item, index) => (
          <div
            key={index}
            className={styles.image}
            style={{
              backgroundImage: `url("${contents[currentIndex].image}")`,
              backgroundSize: 'cover'
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Header
