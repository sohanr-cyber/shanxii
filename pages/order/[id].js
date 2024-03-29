import React, { useEffect, useState } from 'react'
import styles from '../../styles/Order/Details.module.css'
import OrderSummary from '@/components/Order/OrderSummary'
import { useSelector } from 'react-redux'
import BASE_URL from '@/config'
import axios from 'axios'
import OrderStatus from '@/components/Order/OrderStatus'

const Order = ({ order }) => {
  const cartItems = useSelector(state => state.cart.items)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>

        <h2>OrderId: #{order._id}</h2>
        <div className={styles.status__steps}>
          <OrderStatus order={order} />
        </div>
        <div className={styles.statusTimeline}>
          {[1, 2, 2, 2].map((_, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.timeline}>07 Dec 2023 - 11:55 </div>
              <div className={styles.status}>
                Your package has been delivered. Thank you for shopping at
                Daraz!
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        {isClient && (
          <OrderSummary
            cartItems={order.items}
            shipping={50}
            total={order.total}
          />
        )}
      </div>
    </div>
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
