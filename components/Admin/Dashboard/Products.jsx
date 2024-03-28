import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'

const Products = ({ title, dashboard, products, totalPages }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  useEffect(() => {
    setFilteredProducts(products)
  }, [products])
  // Function to handle search query change
  const handleSearchChange = e => {
    const query = e.target.value
    setSearchQuery(query)

    // Filter products based on the search query
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
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
                value={searchQuery}
                onChange={e => handleSearchChange(e)}
              />
              <span>
                <SearchIcon />
              </span>
            </div>
            <div className={styles.right}>
              <button onClick={() => router.push('/admin/product/create')}>
                Add Product
              </button>
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          {' '}
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
              {filteredProducts?.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.discount}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.categories?.map((item, index) => (
                      <span key={index}>{item?.name}</span>
                    ))}
                  </td>
                  <td>{product.stockQuantity}</td>
                  <td>{product.sold}</td>

                  <td className={styles.action}>
                    <span>Delete</span>
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
            <Pages totalPages={totalPages} currentPage={2} />
          </div>
        )}
      </div>
    </>
  )
}

export default Products
