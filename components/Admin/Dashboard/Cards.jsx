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
      {/* <Card
        item={{ ...data[0], number: `${getTotalProfit(profit)} TK.` }}
        index={0}
      /> */}

      <Card item={{ ...data[1], number: total.totalOrders }} index={1} />
      <Card item={{ ...data[2], number: total.totalCompleted }} index={2} />
      <Card item={{ ...data[3], number: total.totalPending }} index={3} />
      {/* <Card item={{ ...data[3], number: total.totalOrders }} index={3} /> */}
    </div>
  )
}

export default Cards
