import React from 'react'
import styles from '../../../styles/Admin/Home.module.css'
import SideBar from '@/components/Admin/SideBar'
import Dashboard from '@/components/Admin/Dashboard/Dashboard'
import Product from '@/components/Product'
import Address from '@/components/Admin/Dashboard/Address'
import BASE_URL from '@/config'
import axios from 'axios'
import { parse } from 'cookie'

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

    const response = await axios.get(
      `${BASE_URL}/api/address?page=${page || 1}&query=${
        query || ''
      }&position=${position}`,
      {
        headers
      }
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
