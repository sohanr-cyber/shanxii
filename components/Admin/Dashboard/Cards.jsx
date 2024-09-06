import Card from '@/components/Chart/Card'
import React from 'react'
import styles from '../../../styles/Admin/Cards.module.css'
import { getTotalProfit } from '@/utility/helper'

const data = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/8564/8564090.png',
    number: '$405,30',
    title: 'Total Sales'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/6815/6815043.png',
    number: '530',
    title: 'Total Orders'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/10543/10543159.png',
    number: '490',
    title: 'Orders Completed'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/128/1090/1090965.png',
    number: '30',
    title: 'Orders Pending'
  }
]
4
const Cards = ({ total, profit }) => {
  return (
    <div className={styles.wrapper}>
      <Card
        item={{ ...data[0], number: `${getTotalProfit(profit)} TK.` }}
        index={0}
        totalAmount={total.totalOrderAmount}
        status={'None'}
        title={'Total Order'}
        total={total.totalOrders}
        orderTotal={total.totalOrders}
        icon={'https://cdn-icons-png.flaticon.com/128/17385/17385190.png'}
      />

      <Card
        item={{ ...data[1], number: total?.totalOrders }}
        index={1}
        status={'Delivered'}
        title='Delivered'
        totalAmount={total.totalDeliveredAmount}
        total={total.totalDelivered}
        orderTotal={total.totalOrders}
        icon={'https://cdn-icons-png.flaticon.com/128/6815/6815043.png'}
      />

      <Card
        item={{ ...data[1], number: total?.totalOrders }}
        index={1}
        status={'Delivering'}
        title='Delivering'
        totalAmount={total.totalDeliveringAmount}
        total={total.totalDelivering}
        orderTotal={total.totalOrders}
        icon={'https://cdn-icons-png.flaticon.com/128/4847/4847433.png'}
      />
      <Card
        item={{ ...data[3], number: total?.totalPending }}
        index={3}
        status={'Pending'}
        totalPending={total.totalPending}
        totalAmount={total.totalPendingAmount}
        title={'Pending'}
        total={total.totalPending}
        orderTotal={total.totalOrders}
        icon={'https://cdn-icons-png.flaticon.com/128/9796/9796480.png'}
      />

      <Card
        item={{ ...data[2], number: total?.totalDelivered }}
        index={2}
        status={'Confirmed'}
        total={total.totalConfirmed}
        title={'Confirmed'}
        totalAmount={total.totalConfirmedAmount}
        orderTotal={total.totalOrders}
        icon={'https://cdn-icons-png.flaticon.com/128/8888/8888205.png'}
      />

      <Card
        item={{ ...data[3], number: total.totalCanceled + total.totalFailed }}
        index={3}
        totalAmount={total.totalCanceledAmount + total.totalFailedAmount}
        title={'Failed'}
        status={'Failed'}
        total={total.totalCanceled + total.totalFailed}
        orderTotal={total.totalOrders}
        icon={'https://cdn-icons-png.flaticon.com/128/1828/1828843.png'}
      />
    </div>
  )
}

export default Cards
