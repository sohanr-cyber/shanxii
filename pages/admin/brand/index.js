import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Orders from '@/components/Admin/Dashboard/Orders'
import Brands from '@/components/Admin/Dashboard/Brands'
import axios from 'axios'
import BASE_URL from '@/config'

const index = ({ brands, totalPages, currentPage }) => {
  return (
    <div className={styles.wrapper}>
      <Brands
        brands={brands}
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
    const response = await axios.get(`${BASE_URL}/api/brand?page=${page}`)
    const { brands, totalPages, page: currentPage } = response.data
    return {
      props: {
        brands,
        totalPages,
        currentPage
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        title: 'Product List',
        brands: []
      }
    }
  }
}
