import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { colors, companyName } from '@/utility/const'

const Logo = ({ color }) => {
  const router = useRouter()
  const name = companyName || 'DecoNest'

  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      {name.split('').map((i, index) => (
        <div key={index} style={{ color: `${color}` }}>
          {i}
        </div>
      ))}
    </div>
  )
}

export default Logo
