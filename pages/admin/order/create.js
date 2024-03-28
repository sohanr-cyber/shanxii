import React from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'

// Order Craetion Form
const create = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Add Order</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Product Name</label>
            <input type='text' placeholder='Enter Product Name' />
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

export default create
