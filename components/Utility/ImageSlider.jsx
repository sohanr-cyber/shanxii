import React, { useState, useEffect } from 'react'
import styles from '../../styles/Utility/Slider.module.css' // Import your CSS file for styling
import Image from 'next/image'

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(intervalId)
  }, [images, interval])

  return (
    <div className={styles.slider}>
      {images.map((image, index) => (
        <Image src={image} width={1280} height={720} alt='' key={index} />
      ))}
    </div>
  )
}

export default ImageSlider
