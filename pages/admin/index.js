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

const index = () => {
  return (
    <div className={styles.wrapper}>
      <Cards />
      <Orders />
      <Products />
      <div className={styles.flex}>
        <Graph title={'Recent Orders'} />
        <BarChart title={'Revinue'} />
      </div>{' '}
      {/* <div className={styles.flex} style={{ margin: '15px 0;' }}>
        <BarChart title={'Revinue'} />
        <Graph />
      </div> */}
    </div>
  )
}

export default index
