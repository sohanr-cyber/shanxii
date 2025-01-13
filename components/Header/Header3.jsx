import React, { useEffect, useState } from 'react'
import styles from '../../styles/Header/Header3.module.css'
import Image from 'next/image'
import { themeBg } from '@/utility/const'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { SlideshowRounded } from '@mui/icons-material'
// const contents = [
//   {
//     image:
//       'https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/46212/men-s-shirt-shirt-attire-clothing-46212.jpeg?auto=compress&cs=tinysrgb&w=600'
//   }
// ]

const Header3 = ({ contents }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % contents.length)
    }, 5000) // Adjust the interval time as needed (in milliseconds)

    return () => {
      clearInterval(interval)
    }
  }, [contents.length])

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <>
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
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <div className={styles.surface} onDoubleClick={() => { userInfo?.role == "admin" && router.push(`/admin/content/create?id=${slide._id}`) }}
                style={{
                  color: `${slide.textColor}`

                }}  >
                {slide.title && <h2>{slide.title}</h2>}
                {slide.description && <p> {slide.description} </p>}
                {slide.buttonText && slide.buttonHref && (
                  <button onClick={() => router.push(slide.buttonHref)}>
                    {slide.buttonText}
                  </button>
                )}{' '}
              </div>
            </div>
          ))}
        </>
      </div>
      <div className={styles.dots}>
        {contents.map((i, indx) => (
          <span
            key={indx}
            className={styles.dot}
            style={currentSlide == indx ? { background: themeBg } : {}}
            onClick={() => setCurrentSlide(indx)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Header3
