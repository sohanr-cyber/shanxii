import React, { useEffect, useState } from 'react'
import styles from '../../styles/Order/Details.module.css'
import OrderSummary from '@/components/Order/OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import BASE_URL from '@/config'
import axios from 'axios'
import OrderStatus from '@/components/Order/OrderStatus'
import { useRouter } from 'next/router'
import { getTime } from '@/utility/helper'
import { orderDetailSeoData, statusMessages } from '@/utility/const'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { NextSeo } from 'next-seo'

const statuses = [
  'Pending',
  'Processing',
  'Confirmed',
  'Packing',
  'Packed',
  'Delivering',
  'Delivered',
  'Canceled',
  'Failed'
]
const Order = ({ order: orderDetail }) => {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const [order, setOrder] = useState(orderDetail)
  const userInfo = useSelector(state => state.user.userInfo)

  const dispatch = useDispatch()
  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateOrderStatus = async status => {
    if (
      order.statusTimeline.find(
        i =>
          i.status == 'Failed' ||
          i.status == 'Canceled' ||
          i.status == 'Delivered'
      )
    ) {
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(`/api/order/${router.query.id}`, {
        newStatus: status
      })
      const { data: order } = await axios.get(`/api/order/${router.query.id}`)
      setOrder(order)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())

      console.log(error)
    }
  }
  return (
    <>
      <NextSeo {...orderDetailSeoData} />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h2>OrderId: #{order._id}</h2>
          <div className={styles.update}></div>
          <div className={styles.status__steps}>
            <OrderStatus order={order} />
          </div>
          {isClient && userInfo?.role == 'admin' && (
            <div className={styles.update__status}>
              {[
                statuses?.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => updateOrderStatus(item)}
                    style={
                      order?.statusTimeline?.find(i => i.status == item)
                        ? { background: 'black', color: 'white' }
                        : {}
                    }
                  >
                    {item}
                  </span>
                ))
              ]}
            </div>
          )}

          <div className={styles.statusTimeline}>
            {order?.statusTimeline?.map((_, index) => (
              <div
                className={styles.item}
                key={index}
                style={
                  _.status === 'Failed' || _.status === 'Canceled'
                    ? { color: 'red' }
                    : _.status == 'Delivered'
                    ? { color: 'green' }
                    : {}
                }
              >
                <div className={styles.timeline}>{getTime(_.timestamp)}</div>
                <div className={styles.status}>
                  {statusMessages[_.status.toLowerCase()]}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/shop')}>
            Go Back To Shopping
          </button>
        </div>
        <div className={styles.right}>
          {isClient && (
            <OrderSummary
              cartItems={order.items}
              shipping={order.shippingCost}
              total={order.total}
              discount={order.discount}
              address={order.shippingAddress}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Order

export async function getServerSideProps (context) {
  const { id } = context.query
  try {
    const { data: order } = await axios.get(`${BASE_URL}/api/order/${id}`)
    return {
      props: {
        order
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        order: {}
      }
    }
  }
}
