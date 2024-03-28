import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Cart/OrderSummary.module.css'
import { calculateSubtotal } from '@/utilty/helper'
const OrderSummary = ({ cartItems }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.summary}>
        <div className={styles.title}>Order Summary</div>
        <div className={styles.cart__subtotal}>
          <div className={styles.flex}>
            <div className={styles.key}>Cart Subtotal:</div>
            <div className={styles.value}>{calculateSubtotal(cartItems)}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Shipping:</div>
            <div className={styles.value}>32532</div>
          </div>
        </div>
        <div className={styles.order__total}>
          <div className={styles.key}>Order Total:</div>
          <div className={styles.value}>363</div>
        </div>
      </div>
      <div className={styles.cart__items}>
        <div className={styles.title}>Items In Your Cart</div>
        {[...cartItems].map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.left}>
              <Image
                src={item.product.thumbnail}
                width='40'
                height='40'
                alt=''
              />
            </div>
            <div className={styles.right}>
              <div>{item.product.name}</div>
              {item.size && (
                <div style={{ fontSize: '80%', marginTop: '2px' }}>
                  {item.size}
                </div>
              )}
              <div style={{ fontSize: '80%', marginTop: '2px' }}>
                ৳{' '}
                {parseInt(
                  item.product.price -
                    item.product.price * (item.product.discount / 100)
                )}{' '}
                * {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderSummary
