import React from 'react'
import styles from '../styles/ProductsByCategory.module.css'
import Product from './Product'

const ProductsByCategory = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.item}>Gents</div>
        </div>
        <div className={styles.right}>
          <div className={styles.item}>Men Shirt</div>
          <div className={styles.item}>Men Shirt</div>
        </div>
      </div>
      <div className={styles.products}>
        {[1, 2, 3, 5, 1, 2, 3, 5].map((item, index) => (
          <Product key={index} />
        ))}
      </div>
    </div>
  )
}

export default ProductsByCategory
