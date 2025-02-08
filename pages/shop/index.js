import React, { useEffect, useState } from 'react'
import styles from '../../styles/Shop/Shop.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import GridViewIcon from '@mui/icons-material/GridView'
import Product from '@/components/Product'
import axios from 'axios'
import BASE_URL from '@/config'
import { TurnRightSharp } from '@mui/icons-material'
import Filter from '@/components/Shop/Filter'
import Pagination from '@/components/Utility/Pagination'
import { useRouter } from 'next/router'
import filterProducts from '@/utility/fillter'

const sortOptions = [
  {
    value: 'Best Match',
    query: {
      sortBy: '',
      sortOrder: ''
    }
  },
  {
    value: 'Price Low To High',
    query: {
      sortBy: 'price',
      sortOrder: 'asc'
    }
  },
  {
    value: 'Price Hight To Low',
    query: {
      sortBy: 'price',
      sortOrder: 'desc'
    }
  },
  {
    value: 'Newest To Oldest',
    query: {
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
  },
  {
    value: 'Oldest To Newest',
    query: {
      sortBy: 'createdAt',
      sortOrder: 'asc'
    }
  }
]
const Home = ({ products }) => {
  const [productData, setProductData] = useState(filterProducts(products, {}))


  const [open, setOpen] = useState(false)
  const router = useRouter()

  const updateRoute = data => {
    console.log({ data })
    const queryParams = { ...router.query, page: 1, ...data }

    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })


  }

  useEffect(() => {
    const queryParams = { ...router.query }
    console.log({ queryParams })
    setProductData(filterProducts(products, queryParams))

  }, [router.query])


  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.filter} onClick={() => setOpen(true)}>
            <FilterAltIcon />
            Filter
          </div>
          <div>{productData.count} items found </div>
        </div>
        <div className={styles.right}>
          <select
            onChange={e => {
              updateRoute(
                sortOptions.find(item => item.value == e.target.value).query
              )
            }}
          >
            {[...sortOptions].map((i, index) => (
              <option key={index} value={i.value}>
                {i.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.products}>
        {productData.products.map((item, index) => (
          <Product key={index} item={item} redirect={true} />
        ))}
      </div>
      <div className={styles.flex}>
        <Pagination totalPages={productData.totalPages} currentPage={productData.page} />
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

export async function getStaticProps() {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/search`);
    const products = response.data;

    return {
      props: {
        products,
      },
      revalidate: 60, // Revalidate every 60 seconds (1 minute)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    
    return {
      props: {
        title: 'Product List',
        products: [],
      },
      revalidate: 60, // Ensure revalidation even if there's an error
    };
  }
}
