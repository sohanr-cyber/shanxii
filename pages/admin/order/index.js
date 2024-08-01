import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Orders from '@/components/Admin/Dashboard/Orders'
import BASE_URL from '@/config'
import axios from 'axios'

const index = ({ orders, totalPages, currentPage, page }) => {
  return (
    <div className={styles.wrapper}>
      <Orders
        title={'Order List'}
        orders={orders}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}

export default index

export async function getServerSideProps (context) {
  try {
    const { page, query, status } = context.query
    const response = await axios.get(
      `${BASE_URL}/api/order?page=${page || 1}&query=${
        query || ''
      }&status=${status}`
    )
    const { orders, totalPages, page: currentPage } = response.data
    console.log({ orders })
    return {
      props: {
        title: 'Order List',
        orders,
        totalPages,
        currentPage
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        title: 'Order List',
        orders: [],
        totalPages: 0,
        currentPage: 0
      }
    }
  }
}
