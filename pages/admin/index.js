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

const index = ({ orders, products, total, orderGraph }) => {
  return (
    <div className={styles.wrapper}>
      <Cards total={total} />
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
        <LineChart title={'Recent Orders'} orderGraph={orderGraph} />
        <BarChart title={'Revinue'} />
      </div>{' '}
      <div className={styles.flex} style={{ margin: '15px 0;' }}>
        <BarChart title={'Revinue'} />
        <Graph title={'Recent Orders'} orderGraph={orderGraph} />
      </div>
      {/* <Reviews /> */}
    </div>
  )
}

export default index

export async function getStaticProps () {
  try {
    const page = 1

    const {
      data: { products }
    } = await axios.get(`${BASE_URL}/api/product`)
    const {
      data: { orders }
    } = await axios.get(`${BASE_URL}/api/order`)

    const { data: total } = await axios.get(
      `${BASE_URL}/api/summary/order-total`
    )
    console.log({ total })
    const { data: orderGraph } = await axios.get(
      `${BASE_URL}/api/summary/order-graph`
    )

    return {
      props: {
        products,
        orders,
        total,
        orderGraph
      },
      revalidate: 10
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        products: [],
        orders: [],
        total: {}
      }
    }
  }
}
