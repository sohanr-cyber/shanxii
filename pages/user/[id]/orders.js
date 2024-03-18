import React from 'react'
import styles from '../../../styles/User/Home.module.css'
import Navigator from '@/components/User/Navigator'
import Orders from '@/components/User/Orders'

const OrderHistory = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Navigator />
      </div>
      <div className={styles.right}>
        <Orders />
      </div>
    </div>
  )
}

export default OrderHistory
