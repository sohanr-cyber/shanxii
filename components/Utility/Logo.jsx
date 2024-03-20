import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter()
  
  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      <Image src='/images/logo.png' width={40} height={40} alt='' />
      <div className={styles.right}>
        <div className={styles.top}>uince</div>
      </div>
    </div>
  )
}

export default Logo
