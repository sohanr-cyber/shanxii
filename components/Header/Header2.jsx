import React, { useEffect, useState } from 'react'
import styles from '../../styles/Header/Header2.module.css'
import Image from 'next/image'
import { themeBg } from '@/utility/const'

const Header3 = ({ contents: images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contents, setContents] = useState([
    ...images,
    ...images,
    ...images,
    ...images
  ])

  const [current, setCurrent] = useState({
    slide1: 0,
    slide2: 1,
    slide3: 2,
    slide4: 3
  })

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide(prevSlide => (prevSlide + 1) % contents.length)
  //   }, 5000) // Adjust the interval time as needed (in milliseconds)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [contents.length])

  const slideChange = postion => {
    setCurrent({
      slide1: (current.slide1 + postion) % contents.length,
      slide2: (current.slide2 + postion) % contents.length,
      slide3: (current.slide3 + postion) % contents.length,
      slide4: (current.slide4 + postion) % contents.length
    })
  }

  const getSlide = nth => {
    setCurrent({
      slide1: nth - 1,
      slide2: nth + 2,
      slide3: nth + 3,
      slide4: nth + 4,
    })
  }

  return (
    <div className={styles.wrapper}>
      {currentSlide}
      <div className={styles.slider}>
        <div className={styles.inner_slider} style={{ minWidth: '5%' }}>
          {' '}
          {contents.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: `translateX(-${current.slide1 * 100}%)`
              }}
            ></div>
          ))}
        </div>
        <div className={styles.inner_slider} style={{ minWidth: '70%' }}>
          {contents.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: `translateX(-${current.slide2 * 100}%)`
              }}
            ></div>
          ))}
        </div>
        <div className={styles.inner_slider} style={{ minWidth: '15%' }}>
          {contents.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: `translateX(-${current.slide3 * 100}%)`
              }}
            ></div>
          ))}
        </div>
        <div className={styles.inner_slider} style={{ minWidth: '5%' }}>
          {contents.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: `translateX(-${current.slide4 * 100}%)`
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {contents.map((i, indx) => (
          <span
            key={indx}
            className={styles.dot}
            style={currentSlide == indx ? { background: themeBg } : {}}
            onClick={() => slideChange(1)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Header3
