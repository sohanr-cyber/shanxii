import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Products from '@/components/Admin/Dashboard/Products'
import BASE_URL from '@/config'
import axios from 'axios'
import { current } from '@reduxjs/toolkit'

const index = ({ products, totalPages, currentPage }) => {
  return (
    <div className={styles.wrapper}>
      <Products
        title={'Product List'}
        products={products}
        totalPages={totalPages}
      />
    </div>
  )
}

export default index

export async function getServerSideProps (context) {
  try {
    const { page } = context.query
    console.log('new rquesy for page', page)
    const response = await axios.get(`${BASE_URL}/api/product?page=${page}`)
    const { products, totalPages, page: currentPage } = response.data
    return {
      props: {
        title: 'Product List',
        products,
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
