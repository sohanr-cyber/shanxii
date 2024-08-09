import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Address from '@/components/Admin/Dashboard/Address'
import BASE_URL from '@/config'
import axios from 'axios'

const index = ({ addresses, totalPages, currentPage, page }) => {
  return (
    <div className={styles.wrapper}>
      <Address
        title={'Address List'}
        addresses={addresses}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}

export default index

export async function getServerSideProps (context) {
  try {
    const { page, query, position } = context.query
    const response = await axios.get(
      `${BASE_URL}/api/address?page=${page || 1}&query=${
        query || ''
      }&position=${position}`
    )
    const { addresses, totalPages, page: currentPage } = response.data
    console.log({ addresses })
    return {
      props: {
        title: 'Address List',
        addresses,
        totalPages,
        currentPage
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        title: 'Address List',
        addresses: [],
        totalPages: 0,
        currentPage: 0
      }
    }
  }
}
