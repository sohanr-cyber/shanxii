import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <Image src='/images/logo.png' width={40} height={40} alt='' />
      <div className={styles.right}>
        <div className={styles.top}>uince</div>
      </div>
    </div>
  )
}

export default Logo
