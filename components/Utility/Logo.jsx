import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { colors } from '@/utilty/const'

function hexToRGBA (hex, opacity) {
  // Remove '#' if present
  hex = hex.replace('#', '')

  // Parse hexadecimal components
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  // Return RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const Logo = () => {
  const router = useRouter()
  const name = 'Quince'

  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      {name.split('').map((i, index) => (
        <div
          key={index}
          style={
            {
              // color: `${colors[index + 3].code}`
              // background: `${hexToRGBA(colors[index + 3].code, 0.1)}`
              // opacity: '0.1'
            }
          }
        >
          {i}
        </div>
      ))}
    </div>
  )
}

export default Logo
