import React from 'react'
import styles from '../../styles/Cart/Checkout.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Checkout = () => {
  return (
    <div className={styles.checkout__wrapper}>
      <div className={styles.flex}>
        <div className={styles.left}>
          <input type='text' placeholder='Coupon Code' />
          <button>Apply Coupon</button>
        </div>
        <div className={styles.right} style={{ fontSize: '110%' }}>
          Subtotal: <span style={{ fontWeight: 'bold' }}>$850.00</span>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.left}>
          <button>Back To Shop</button>
        </div>
        <div className={styles.right}>
          <button>Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
