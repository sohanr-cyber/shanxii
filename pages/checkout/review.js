import React, { useEffect, useState } from 'react'
import styles from '../../styles/Checkout/Review.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import OrderSummary from '@/components/Order/OrderSummary'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { clearCart } from '@/redux/cartSlice'
import { calculateSubtotal, getDeliveryCharge, getPrice } from '@/utilty/helper'
const Address = () => {
  const cartItems = useSelector(state => state.cart.items)
  const buyNowItems = useSelector(state => state.cart.buyNow)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const addressInfo = useSelector(state => state.address.addressInfo)
  const [address, setAddress] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    setIsClient(true)
    setAddress(addressInfo)
  }, [])

  const makeOrder = async cartItems => {
    if (cartItems.length == 0) {
      return
    }
    try {
      const { data } = await axios.post('/api/order/checkout', {
        items: cartItems.map(i => ({
          product: i.product._id,
          quantity: i.quantity,
          size: i.size,
          color: i.color
        })),
        shippingAddress: { ...addressInfo, type: 'Home' }
      })
      console.log(data)
      router.push(`/order/${data._id}`)
      dispatch(clearCart())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2>Review Your Order</h2>
        <div className={styles.title}>Shipping Address:</div>
        <div className={styles.fields}>
          <div className={styles.field}>
            <div className={styles.key}>Name:</div>
            <div className={styles.value}>{address?.fullName}</div>
          </div>{' '}
          <div className={styles.field}>
            <div className={styles.key}>Phone:</div>
            <div className={styles.value}>{address?.phone}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.key}>email:</div>
            <div className={styles.value}>{address?.email}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.key}>Address:</div>
            <div className={styles.value}> {address?.address}</div>
          </div>
        </div>
        <div className={styles.title}>Pay With</div>
        <div className={styles.flex}>
          <div className={styles.cash__on}>
            <div>
              <Image
                src='https://cdn-icons-png.flaticon.com/128/3812/3812106.png'
                width='80'
                height='50'
                alt=''
              />
            </div>{' '}
            <div style={{ color: 'blue' }}>Cash On Delivery</div>
          </div>
          <div className={styles.bkash}>
            <div>
              {' '}
              <Image src='/images/bkash.png' width='80' height='50' alt='' />
            </div>{' '}
            {/* <div>Payment</div>{' '} */}
          </div>
        </div>
        <button
          onClick={() =>
            makeOrder(router.query.buyNow ? buyNowItems : cartItems)
          }
        >
          Place Order
        </button>
        <p>
          After placing your order, we will be contacting you shortly to confirm
          it. Please anticipate a call from us at 035032850325 to complete your
          purchase.
        </p>
      </div>
      <div className={styles.right}>
        {isClient && (
          <OrderSummary
            cartItems={router.query.buyNow == 'true' ? buyNowItems : cartItems}
            shipping={getDeliveryCharge(addressInfo.position)}
            total={getPrice(
              calculateSubtotal(
                router.query.buyNow == 'true' ? buyNowItems : cartItems
              ) + getDeliveryCharge(addressInfo.position)
            )}
            address={addressInfo}
          />
        )}{' '}
      </div>
    </div>
  )
}

export default Address
