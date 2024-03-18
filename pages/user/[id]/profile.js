import React from 'react'
import styles from '../../../styles/User/Home.module.css'
import Navigator from '@/components/User/Navigator'
import Profile from '@/components/User/Profile'
const profile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Navigator />
      </div>
      <div className={styles.right}>
        <Profile />
      </div>
    </div>
  )
}

export default profile
