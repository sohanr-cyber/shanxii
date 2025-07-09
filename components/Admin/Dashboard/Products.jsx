import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { orderStatusColors } from '@/utility/const'
import { extractRGBA } from '@/utility/helper'
import Image from 'next/image'
import { setDuplicateProduct } from '@/redux/productSlice'

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
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: `Bearer ${userInfo?.token}` }
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


  const handleDuplicate = async (product) => {
    try {
      dispatch(startLoading())
      const { data } = await axios.get(`/api/product/${product._id}`)
      dispatch(setDuplicateProduct(data))
      router.push('/admin/product/create')
      dispatch(finishLoading())
    } catch (error) {
      console.log(error)
      dispatch(finishLoading())
    }
  }

  const remove = async id => {
    try {
      dispatch(startLoading())
      const { data } = await axios.delete(`/api/product/${id}`, {
        headers
      })
      setFilteredProducts({
        ...filteredProducts,
        products: filteredProducts.products.filter(i => i._id != id)
      })
      dispatch(finishLoading())
      dispatch(showSnackBar({ message: 'Product Removed !' }))
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Deleting Product !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }

  const handleClone = async (product) => {
    try {
      dispatch(startLoading())
      const { data } = await axios.post('/api/product/utility', {
        _id: product._id
      })
      dispatch(showSnackBar({
        message: `${data.count} Product cloned succcessfully!`
      }))
      router.push('/admin/product')
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
                <th>Product </th>
                <th>Price</th>
                <th>Categories</th>
                <th>Stock Quantity</th>
                <th>Sold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.products?.map((product, index) => (
                <tr
                  key={index}
                  style={{
                    borderLeft: `3px solid ${orderStatusColors[
                      `${product.stockQuantity < 5
                        ? 'pending'
                        : product.stockQuantity <= 1
                          ? 'failed'
                          : 'none'
                        }`.toLowerCase()
                    ]
                      }`,
                    background: `${extractRGBA(
                      orderStatusColors[
                      `${product.stockQuantity < 5
                        ? 'pending'
                        : product.stockQuantity <= 1
                          ? 'failed'
                          : 'none'
                        }`.toLowerCase()
                      ],
                      0.1
                    )}`,
                    fontWeight: `${(new Date() - new Date(product.createdAt)) > 30 * 1000 ? "normal" : "bold"}`
                  }}
                >
                  <td onClick={() => router.push(`/product/${product.slug}`)} style={{ minWidth: "240px" }}>
                    <div className={styles.flex} style={{ justifyContent: "flex-start", gap: "15px", alignItems: "center" }}>
                      <Image src={product.thumbnail} width={55} height={55} />
                      {product.name.length > 20 ? <>{product.name.slice(0, 20)}...</> : product.name}
                    </div>
                  </td>
                  <td>
                    <div>{product.price}</div>
                    <div>-{product.discount || 0}%</div>
                    <div>{product.priceWithDiscount}</div>

                  </td>
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
                    <span onDoubleClick={() => remove(product._id)}>
                      Delete
                    </span>
                    <span
                      onClick={() =>
                        router.push(`/admin/product/create?id=${product._id}`)
                      }
                    >
                      View
                    </span>
                    <span onClick={() => handleDuplicate(product)}>
                      Duplicate
                    </span>
                    {product.variants.length > 1 && <span onClick={() => handleClone(product)}>
                      Clone
                    </span>}
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
