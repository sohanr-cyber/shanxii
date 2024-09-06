import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Cart/OrderSummary.module.css'
import { calculateSubtotal, extractRGBA, getPrice } from '@/utility/helper'
import { useRouter } from 'next/router'
import { orderStatusColors } from '@/utility/const'
const OrderSummary = ({
  cartItems,
  shipping,
  total,
  address,
  discount,
  paymentMethod,
  paymentStatus
}) => {
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
          <div className={styles.flex}>
            <div className={styles.key}>Discount:</div>
            <div className={styles.value}>-{getPrice(discount || 0)}</div>
          </div>
        </div>
        <div className={styles.order__total}>
          <div className={styles.key}>Order Total:</div>
          <div className={styles.value}>{total}</div>
        </div>
      </div>
      <div className={styles.cart__items}>
        <div className={styles.title}>Items In Your Cart</div>
        {cartItems?.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() =>
              router.push(
                `/product/${item.product.slug}?quantity=${item.quantity}&size=${item.size}`
              )
            }
          >
            <div className={styles.left}>
              <Image
                src={item.product?.thumbnail}
                width='40'
                height='40'
                alt=''
              />
            </div>
            <div className={styles.right}>
              <div>{item.product?.name}</div>
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
        {paymentMethod && (
          <>
            {' '}
            <div className={styles.title}>Payment Method</div>
            <div className={styles.address}>
              {paymentMethod == 'COD' ? 'Cash On Delivery(COD)' : paymentMethod}
            </div>
          </>
        )}
        {paymentStatus && (
          <>
            {' '}
            <div className={styles.title}>Payment Status</div>
            <div className={styles.address}>
              <span
                className={styles.paymentStatus}
                style={{
                  background: `${extractRGBA(
                    orderStatusColors[paymentStatus.toLowerCase()],
                    0.2
                  )}`,
                  padding: '3px 3px',
                  borderRadius: '5px'
                }}
              >
                {paymentStatus}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderSummary
