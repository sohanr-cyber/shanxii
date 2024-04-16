import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Orders from '@/components/Admin/Dashboard/Orders'
import Coupons from '@/components/Admin/Dashboard/Coupons'
import axios from 'axios'
import BASE_URL from '@/config'

const index = ({ coupons, totalPages, currentPage }) => {
  return (
    <div className={styles.wrapper}>
      <Coupons
        coupons={coupons}
        totalPages={totalPages}
        currentPage={currentPage}
        title={'Category List'}
      />
    </div>
  )
}

export default index

export async function getServerSideProps (context) {
  try {
    const { page } = context.query
    const response = await axios.get(`${BASE_URL}/api/coupon?page=${page}`)
    const { coupons, totalPages, page: currentPage } = response.data
    return {
      props: {
        coupons,
        totalPages,
        currentPage
      }
    }
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return {
      props: {
        title: 'Coupon List',
        Coupons: []
      }
    }
  }
}
