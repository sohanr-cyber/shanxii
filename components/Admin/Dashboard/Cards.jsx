import Card from '@/components/Chart/Card'
import React from 'react'
import styles from '../../../styles/Admin/Cards.module.css'
import { getTotalProfit, summarizeOrders } from '@/utility/helper'

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
const Cards = ({ summary }) => {
  const result = summary
  return (
    <div className={styles.wrapper}>
      <Card
        index={0}
        totalAmount={result.totalAmount}
        status={'None'}
        title={'Total Order'}
        total={result.total}
        orderTotal={result.total}
        icon={'https://cdn-icons-png.flaticon.com/128/17385/17385190.png'}
      />

      <Card
        // item={{ ...data[1], number: total?.totalOrders }}
        index={1}
        status={'Delivered'}
        title='Delivered'
        totalAmount={result.deliveredAmount}
        total={result.delivered}
        orderTotal={result.total}
        icon={'https://cdn-icons-png.flaticon.com/128/6815/6815043.png'}
      />

      <Card
        // item={{ ...data[1], number: total?.totalOrders }}
        index={1}
        status={'Delivering'}
        title='Delivering'
        totalAmount={result.deliveringAmount}
        total={result.delivering}
        orderTotal={result.total}
        icon={'https://cdn-icons-png.flaticon.com/128/4847/4847433.png'}
      />
      <Card
        // item={{ ...data[3], number: total?.totalPending }}
        index={3}
        status={'Pending'}
        totalAmount={result.pendingAmount}
        title={'Pending'}
        total={result.pending}
        orderTotal={result.total}
        icon={'https://cdn-icons-png.flaticon.com/128/9796/9796480.png'}
      />

      <Card
        // item={{ ...data[2], number: total?.totalDelivered }}
        index={2}
        status={'Confirmed'}
        total={result.confirmed}
        title={'Confirmed'}
        totalAmount={result.confirmedAmount}
        orderTotal={result.total}
        icon={'https://cdn-icons-png.flaticon.com/128/8888/8888205.png'}
      />

      <Card
        // item={{ ...data[3], number: total.totalCanceled + total.totalFailed }}
        index={3}
        totalAmount={result.canceledAmount + result.failedAmount}
        title={'Failed'}
        status={'Failed'}
        total={result.canceled + result.failed}
        orderTotal={result.total}
        icon={'https://cdn-icons-png.flaticon.com/128/1828/1828843.png'}
      />
    </div>
  )
}

export default Cards
