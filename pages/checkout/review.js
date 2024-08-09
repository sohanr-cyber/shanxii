import React, { useEffect, useState } from 'react'
import styles from '../../styles/Checkout/Review.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import OrderSummary from '@/components/Order/OrderSummary'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { clearCart, clearCoupon } from '@/redux/cartSlice'
import {
  calculateSubtotal,
  getDeliveryCharge,
  getPrice
} from '@/utility/helper'
import { reviewSeoData, sellerNumber } from '@/utility/const'
import { showSnackBar } from '@/redux/notistackSlice'
import { NextSeo } from 'next-seo'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { handlePurchase } from '@/redux/pixelSlice'

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
    if (!(cartItems.length != 0 || buyNowItems.length != 0)) {
      router.push('/')
    }
  }, [])
  const coupon = useSelector(state => state.cart.coupon)
  const discount = coupon
    ? coupon?.discountType == 'percentage'
      ? getPrice(
          calculateSubtotal(
            router.query.buyNow == 'true' ? buyNowItems : cartItems
          ) -
            getPrice(
              calculateSubtotal(
                router.query.buyNow == 'true' ? buyNowItems : cartItems
              ),
              coupon.discountValue
            )
        )
      : getDeliveryCharge(address.position)
    : 0

  const makeOrder = async cartItems => {
    if (cartItems.length == 0) {
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post('/api/order/checkout', {
        items: cartItems.map(i => ({
          product: i.product._id,
          quantity: i.quantity,
          size: i.size,
          color: i.color
        })),
        shippingAddress: {
          ...addressInfo,
          type: 'Home',
        },
        code: coupon?.code
      })

      if (data.error) {
        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'error'
            }
          })
        )
        dispatch(finishLoading())
        return
      }

      dispatch(finishLoading())

      // console.log(data)
      dispatch(
        showSnackBar({
          message: 'Order Placed',
          option: {
            variant: 'success'
          }
        })
      )
      dispatch(handlePurchase(data))
      router.push(`/order/${data._id}`)
      dispatch(clearCart())
      dispatch(clearCoupon())
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Placing Order !',
          option: {
            variant: 'error'
          }
        })
      )
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo {...reviewSeoData} />
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
            {/* <div className={styles.bkash}>
              <div>
                {' '}
                <Image src='/images/bkash.png' width='80' height='50' alt='' />
              </div>{' '}
            </div> */}
          </div>
          <button
            onClick={() =>
              makeOrder(router.query.buyNow ? buyNowItems : cartItems)
            }
          >
            Place Order
          </button>
          <p>
            After placing your order, we will be contacting you shortly to
            confirm it. Please anticipate a call from <b>us({sellerNumber})</b>{' '}
            at <b>{address.phone}</b> to complete your purchase.
          </p>
        </div>
        <div className={styles.right}>
          {isClient && (
            <OrderSummary
              cartItems={
                router.query.buyNow == 'true' ? buyNowItems : cartItems
              }
              shipping={getDeliveryCharge(addressInfo.position)}
              total={getPrice(
                calculateSubtotal(
                  router.query.buyNow == 'true' ? buyNowItems : cartItems
                ) +
                  getDeliveryCharge(address.position) -
                  discount
              )}
              discount={discount}
              address={addressInfo}
            />
          )}{' '}
        </div>
      </div>
    </>
  )
}

export default Address
