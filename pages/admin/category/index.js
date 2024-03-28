import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Orders from '@/components/Admin/Dashboard/Orders'
import Categories from '@/components/Admin/Dashboard/Categories'

const index = () => {
  return (
    <div className={styles.wrapper}>
      <Categories title={'Category List'} />
    </div>
  )
}

export default index
