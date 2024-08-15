import React from 'react'
import styles from '../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Products from '@/components/Admin/Dashboard/Products'
import Orders from '@/components/Admin/Dashboard/Orders'
import Graph from '../../components/Chart/Graph'
import LineChart from '../../components/Chart/LineChart'
import BarChart from '../../components/Chart/BarChart'
import RecentUsers from '@/components/Admin/Dashboard/Users'
import Cards from '@/components/Admin/Dashboard/Cards'
import Reviews from '@/components/Admin/Dashboard/Reviews'
import Navbar from '@/components/Admin/Navbar'
import axios from 'axios'
import BASE_URL from '@/config'

const index = ({ orders, products, orderGraph, total, profit }) => {
  return (
    <div className={styles.wrapper}>
      <Cards total={total} profit={profit} />
      <Orders
        title={'Recently Created Orders'}
        dashboard={true}
        orders={orders}
      />
      <Products
        title={'Top Selling Product'}
        dashboard={true}
        products={products}
      />
      <div className={styles.flex}>
        <LineChart title={'Orders By Month'} orderGraph={orderGraph} />
        <BarChart title={'Revenue'} profit={profit} />
      </div>{' '}
    </div>
  )
}

export default index
import { parse } from 'cookie' // Import the `parse` function to handle cookies

export async function getServerSideProps (context) {
  try {
    const { id } = context.query
    const { locale, req } = context
    const cookies = parse(req.headers.cookie || '')
    
    const userInfo = cookies['userInfo']
      ? JSON.parse(cookies['userInfo'])
      : null

    if (!userInfo || !userInfo.token) {
      throw new Error('User is not authenticated')
    }

    const headers = { Authorization: `Bearer ${userInfo.token}` }

    const {
      data: { products }
    } = await axios.get(`${BASE_URL}/api/product`, { headers })

    const {
      data: { orders }
    } = await axios.get(`${BASE_URL}/api/order`, { headers })

    const { data: orderGraph } = await axios.get(
      `${BASE_URL}/api/summary/order-graph`,
      { headers }
    )

    const { data: total } = await axios.get(
      `${BASE_URL}/api/summary/order-total`,
      { headers }
    )

    const { data: profit } = await axios.get(
      `${BASE_URL}/api/summary/profit-graph`,
      { headers }
    )

    return {
      props: {
        products,
        orders,
        total,
        orderGraph,
        profit
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        products: [],
        orders: [],
        total: {},
        orderGraph: {},
        profit: {} // Include profit in the error case
      }
    }
  }
}
