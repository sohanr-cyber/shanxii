import React from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Image
          src='https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          width={'1920'}
          height={'1080'}
          alt=''
        />
      </div>
      <div className={styles.right}>
        {[1, 2].map((item, index) => (
          <div className={styles.item} key={index}>
            <Image
              src='https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              width={'1920'}
              height={'1080'}
              alt=''
            />
          </div>
        ))}{' '}
      </div>
    </div>
  )
}

export default Header
