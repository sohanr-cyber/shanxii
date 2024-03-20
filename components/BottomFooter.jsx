import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { useRouter } from 'next/router'
import styles from '../styles/BottomFooter.module.css'
const BottomFooter = () => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.c}>
        <CopyrightIcon />
        2022 All Rights Reserved
      </div>
      <div style={{ color: '' }}>
        Design, Developed and Technical Supported by{' '}
        <span
          style={{
            color: 'purple',
            fontSize: '110%',
            fontWeight: 'bold',
            borderBottom: '1px solid blue',
            paddingBottom: '3px'
          }}
          onClick={() => router.push('https://quince-tech.vercel.app/')}
        >
          Quince.Tech
        </span>
      </div>
    </div>
  )
}

export default BottomFooter
