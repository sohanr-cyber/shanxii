import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter()

  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      <div>Q</div>
      <div className={styles.right}>uince</div>
    </div>
  )
}

export default Logo
