import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Orders from '@/components/Admin/Dashboard/Orders'
import BASE_URL from '@/config'
import axios from 'axios'

const index = ({ orders, totalPages, currentPage }) => {
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
    const { page } = context.query
    const response = await axios.get(`${BASE_URL}/api/order?page=${page}`)
    const { orders, totalPages, page: currentPage } = response.data
    return {
      props: {
        title: 'Product List',
        orders,
        totalPages,
        currentPage
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        title: 'Product List',
        products: []
      }
    }
  }
}
