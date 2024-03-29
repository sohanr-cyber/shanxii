import React from 'react'
import styles from '../styles/ProductsByCategory.module.css'
import Product from './Product'

const ProductsByCategory = ({ category, subCategory, products }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h3 className={styles.item}>{category}</h3>
        </div>
        <div className={styles.right}>
          {subCategory?.map(item => (
            <>
              {' '}
              <div className={styles.item}>Men Shirt</div>
              <div className={styles.item}>Men Shirt</div>
            </>
          ))}
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

export default ProductsByCategory
