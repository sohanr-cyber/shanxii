import React, { useState } from 'react'
import styles from '../../styles/Shop/Shop.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import GridViewIcon from '@mui/icons-material/GridView'
import Product from '@/components/Product'
import axios from 'axios'
import BASE_URL from '@/config'
import { TurnRightSharp } from '@mui/icons-material'
import Filter from '@/components/Shop/Filter'
import Pagination from '@/components/Utility/Pagination'

const Home = ({ products, totalPages, currentPage, count }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.filter} onClick={() => setOpen(true)}>
            <FilterAltIcon />
            Filter
          </div>
          <div>{count} items found </div>
        </div>
        <div className={styles.right}>
          <GridViewIcon />
        </div>
      </div>
      <div className={styles.products}>
        {[...products].map((item, index) => (
          <Product key={index} item={item} redirect={true} />
        ))}
      </div>
      <div className={styles.flex}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
      {open && (
        <div className={styles.filterOptions}>
          <Filter setOpen={setOpen} />
        </div>
      )}
    </div>
  )
}

export default Home

export async function getServerSideProps (context) {
  const { name, categories, colors, minPrice, maxPrice, page } = context.query
  try {
    const response = await axios.get(
      `${BASE_URL}/api/product/filter?name=${name}&categories=${
        categories || 'all'
      }&colors=${colors || 'all'}&minPrice=${minPrice || 'all'}&maxPrice=${
        maxPrice || 'all'
      }&page=${page || 1}`
    )
    const { products, totalPages, page: currentPage, count } = response.data
    return {
      props: {
        title: 'Product List',
        products,
        totalPages,
        currentPage,
        count
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
