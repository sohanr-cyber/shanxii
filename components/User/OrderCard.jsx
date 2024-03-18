import { StyleSharp } from '@mui/icons-material'
import React from 'react'
import styles from '../../styles/User/OrderCard.module.css'
import Image from 'next/image'
const OrderCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>Order ID:0985032853</div>
        <div className={styles.right}>Cash On Delivery</div>
      </div>
      <div className={styles.body}>
        <div className={styles.images}>
          {[1, 2, 3].map((item, index) => (
            <span key={index}>
              <Image
                src={
                  'https://images.pexels.com/photos/46212/men-s-shirt-shirt-attire-clothing-46212.jpeg?auto=compress&cs=tinysrgb&w=600'
                }
                width={80}
                height={80}
                alt=''
              />
            </span>
          ))}
        </div>
        <div className={styles.flex}>
          <div className={styles.total}>Amount Payable</div>
          <div className={styles.price}>৳739</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>Confirmed</div>
        <div className={styles.right}>
          <div className={styles.btn}>Order Agan</div>
          <div className={styles.btn}>View Details</div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
