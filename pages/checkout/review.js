import React, { useEffect, useState } from 'react'
import styles from '../../styles/Checkout/Review.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useSelector } from 'react-redux'
import OrderSummary from '@/components/Order/OrderSummary'
import Image from 'next/image'
import axios from 'axios'
const Address = () => {
  const cartItems = useSelector(state => state.cart.items)
  const [isClient, setIsClient] = useState(false)
  const addressInfo = useSelector(state => state.address.addressInfo)
  const [address, setAddress] = useState({})
  useEffect(() => {
    setIsClient(true)
    setAddress(addressInfo)
  }, [])

  const makeOrder = async () => {
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
          <div className={styles.cash__on} onClick={() => makeOrder()}>
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
      </div>
      <div className={styles.right}>
        {isClient && <OrderSummary cartItems={cartItems} />}
      </div>
    </div>
  )
}

export default Address
