import React from 'react'
import styles from '../../styles/User/Orders.module.css'
import OrderCard from './OrderCard'

const Orders = () => {
  return (
    <div className={styles.wrapper}>
      <h2>My Orders</h2>
      <div className={styles.statuses}>
        {['All', 'Confirmed', 'Delivered', 'Cancelled', 'Failed'].map(
          (item, index) => (
            <span key={index}>{item}</span>
          )
        )}
      </div>

      <div className={styles.orders}>
        {[1, 2, 3, 4].map((item, index) => (
          <OrderCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default Orders
