import React, { useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import axios from 'axios'
import BASE_URL from '@/config'
import Product from '@/components/Product'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone' // Order Craetion Form
const Create = ({ products }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('')

  const [orderItems, setOrderItems] = useState([])

  const incrementQuantity = item => {
    const index = orderItems.findIndex(i => i.productId === item._id)
    console.log('not found')
    // If the object is found
    if (index !== -1) {
      // Update the object at that index with the new values
      orderItems[index] = {
        ...orderItems[index],
        quantity: parseInt(orderItems[index].quantity) + 1
      }
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2>Add Order</h2>
      {orderItems.length}
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Product Name</label>
            <input type='text' placeholder='Enter Product Name' />
          </div>
          <div className={styles.products}>
            {products.map((item, index) => (
              <>
                {' '}
                <div
                  className={styles.item}
                  key={index}
                  onClick={() =>
                    setOrderItems(
                      orderItems.find(i => i.productId == item._id)
                        ? orderItems.filter(i => i.productId != item._id)
                        : [
                            ...orderItems,
                            {
                              productId: item._id,
                              quantity: 1,
                              size: item.sizes?.split(',')[0],
                              color: item.colors?.split(',')[0]
                            }
                          ]
                    )
                  }
                >
                  <>
                    {' '}
                    {orderItems.find(i => i.productId == item._id) && (
                      <FileDownloadDoneIcon
                        style={{ color: 'red', fontSize: '250%' }}
                        className={styles.selected}
                      />
                    )}
                  </>
                  <Product item={item} redirect={false} />
                </div>
              </>
            ))}
          </div>
          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Price</label>
              <input type='text' placeholder='Enter Product Name' />
            </div>
            <div className={styles.field}>
              <label>discount</label>
              <input type='text' placeholder='Enter Product Name' />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Stock Quantity</label>
              <input type='Number' placeholder='' />
            </div>
            <div className={styles.field}>
              <label>Category</label>
              <select>
                {['Select Category', 'Men', 'Kids', 'Winter'].map(
                  (item, index) => (
                    <option key={index}>{item}</option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea></textarea>
          </div>
          <div className={styles.field}>
            <label>Meta Title</label>
            <input type='text' placeholder='Enter Product Name' />
          </div>
          <div className={styles.field}>
            <label>Meta Description</label>
            <textarea></textarea>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.left}>
            <div className={styles.field}>
              <label>Product Name</label>
              <input type='text' placeholder='Enter Product Name' />
            </div>
            <div className={styles.products}>
              {products.map((item, index) => (
                <div className={styles.item} key={index}>
                  <>
                    {orderItems.find(i => i.productId == item._id) && (
                      <FileDownloadDoneIcon
                        style={{ color: 'red', fontSize: '250%' }}
                        className={styles.selected}
                      />
                    )}
                  </>
                  <Product item={item} redirect={false} />
                  <div className={styles.selection}>
                    <div className={styles.sizes}>
                      {item.sizes?.split(',')?.map((i, index) => (
                        <span key={index}>{i}</span>
                      ))}
                    </div>
                    <div className={styles.colors}>
                      {item.colors?.split(',')?.map((i, index) => (
                        <span key={index}>{i}</span>
                      ))}
                    </div>
                    <div className={styles.quantity}>
                      <span onClick={() => incrementQuantity(item)}>
                        <AddIcon />
                      </span>
                      <span>
                        {orderItems.find(i => i.productId == item._id)
                          ?.quantity || 1}
                      </span>
                      <span onClick={() => decrementQuantity(item)}>
                        <RemoveIcon />
                      </span>
                    </div>
                    <button>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.flex}>
              <div className={styles.field}>
                <label>Price</label>
                <input type='text' placeholder='Enter Product Name' />
              </div>
              <div className={styles.field}>
                <label>discount</label>
                <input type='text' placeholder='Enter Product Name' />
              </div>
            </div>
            <div className={styles.flex}>
              <div className={styles.field}>
                <label>Stock Quantity</label>
                <input type='Number' placeholder='' />
              </div>
              <div className={styles.field}>
                <label>Category</label>
                <select>
                  {['Select Category', 'Men', 'Kids', 'Winter'].map(
                    (item, index) => (
                      <option key={index}>{item}</option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Description</label>
              <textarea></textarea>
            </div>
            <div className={styles.field}>
              <label>Meta Title</label>
              <input type='text' placeholder='Enter Product Name' />
            </div>
            <div className={styles.field}>
              <label>Meta Description</label>
              <textarea></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create

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
