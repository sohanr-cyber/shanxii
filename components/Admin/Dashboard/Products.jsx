import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const Products = ({
  title,
  dashboard,
  products,
  totalPages,
  count,
  currentPage
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState({
    products,
    totalPages,
    count,
    page: currentPage
  })

  useEffect(() => {
    setFilteredProducts({ products, totalPages, count, page: currentPage })
  }, [products])

  const updateRoute = data => {
    const queryParams = { ...router.query, ...data }
    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })
  }

  const remove = async id => {
    try {
      dispatch(startLoading())
      const { data } = await axios.delete(`/api/product/${id}`)
      setFilteredProducts({
        ...filteredProducts,
        products: filteredProducts.products.filter(i => i._id != id)
      })
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }
  return (
    <>
      {' '}
      {!dashboard && <h2>{title}</h2>}
      <div className={styles.wrapper} id='products'>
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input
                type='text'
                placeholder='Search by product name...'
                value={searchQuery || router.query.name}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <span onClick={() => updateRoute({ name: searchQuery, page: 1 })}>
                <SearchIcon />
              </span>
            </div>
            <div className={styles.right}>
              <button onClick={() => router.push('/admin/product/create')}>
                <span className={styles.plus__btn}>Add Product</span>
                <span className={styles.plus__icon}>+</span>
              </button>
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Categories</th>
                <th>Stock Quantity</th>
                <th>Sold</th>
                <th>Action</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.products?.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.discount}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.categories?.map((item, index) => (
                      <span key={index}>
                        {item?.name} {'  '}
                      </span>
                    ))}
                  </td>
                  <td>{product.stockQuantity}</td>
                  <td>{product.sold}</td>

                  <td className={styles.action}>
                    <span onClick={() => remove(product._id)}>Delete</span>
                    <span
                      onClick={() =>
                        router.push(`/admin/product/create?id=${product._id}`)
                      }
                    >
                      View
                    </span>
                  </td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>{' '}
        </div>
        {!dashboard && (
          <div className={styles.pagination}>
            <Pages
              totalPages={filteredProducts.totalPages}
              currentPage={filteredProducts.page}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Products
