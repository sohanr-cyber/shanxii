import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Cart/OrderSummary.module.css'
import { calculateSubtotal, getPrice } from '@/utilty/helper'
import { useRouter } from 'next/router'
const OrderSummary = ({ cartItems, shipping, total, address }) => {
  const router = useRouter()
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.summary}>
        <div className={styles.title}>Order Summary</div>
        <div className={styles.cart__subtotal}>
          <div className={styles.flex}>
            <div className={styles.key}>Cart Subtotal:</div>
            <div className={styles.value}>
              {getPrice(calculateSubtotal(cartItems))}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Shipping:</div>
            <div className={styles.value}>{getPrice(shipping)}</div>
          </div>
        </div>
        <div className={styles.order__total}>
          <div className={styles.key}>Order Total:</div>
          <div className={styles.value}>{total}</div>
        </div>
      </div>
      <div className={styles.cart__items}>
        <div className={styles.title}>Items In Your Cart</div>
        {[...cartItems].map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => router.push(`/product/${item.slug}`)}
          >
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
      <div className={styles.shipping}>
        <div className={styles.title}>Shipping Address</div>
        <div className={styles.address}>{address.address}</div>
        <div className={styles.title}>Payment Method</div>
        <div className={styles.address}>Cash on delivery (COD) </div>
      </div>
    </div>
  )
}

export default OrderSummary
