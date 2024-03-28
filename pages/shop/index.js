import React, { useState } from 'react'
import styles from '../../styles/Shop/Shop.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import GridViewIcon from '@mui/icons-material/GridView'
import Product from '@/components/Product'
import FilterSearch from '@/components/Shop/FilterSearch'
const Home = ({ products }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      {open && <FilterSearch />}
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.filter}>
            <FilterAltIcon />
            Filter
          </div>
        </div>
        <div className={styles.right}>
          <GridViewIcon />
        </div>
      </div>
      <div className={styles.products}>
        {[...products].map((item, index) => (
          <Product key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps (context) {
  try {
    const response = await axios.get(`${BASE_URL}/api/product`)
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
