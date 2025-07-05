import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { colors, companyName } from '@/utility/const'

const Logo = ({ color }) => {
  const router = useRouter()
  const name = companyName || '🛍️ Shanxii'

  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      <div className={styles.icon}>🛍️</div><div className={styles.text}> 
        <div className={styles.left}>Shanx</div>
        <div className={styles.right}>ii</div>
      </div>
    </div>
  )
}

export default Logo
