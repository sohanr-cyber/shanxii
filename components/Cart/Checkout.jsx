import React from 'react'
import styles from '../../styles/Cart/Checkout.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'
import { getPrice } from '@/utilty/helper'

const calculateSubtotal = cartItems => {
  let subtotal = 0
  cartItems.forEach(item => {
    subtotal +=
      (item.product.price -
        item.product.price * (item.product.discount / 100)) *
      item.quantity
  })
  return subtotal
}

const Checkout = ({ cartItems }) => {
  const router = useRouter()
  return (
    <div className={styles.checkout__wrapper}>
      <div className={styles.flex}>
        <div className={styles.left}>
          <input type='text' placeholder='Coupon Code' />
          <button>Apply Coupon</button>
        </div>
        <div className={styles.right} style={{ fontSize: '110%' }}>
          Subtotal:{' '}
          <span style={{ fontWeight: 'bold' }}>
            ${getPrice(calculateSubtotal(cartItems))}
          </span>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.left}>
          <button>Back To Shop</button>
        </div>
        <div className={styles.right}>
          <button onClick={() => router.push('/checkout/address')}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
