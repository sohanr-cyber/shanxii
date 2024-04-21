import React from 'react'
import styles from '../styles/ProductsByCategory.module.css'
import Product from './Product'
import ProgressBar from './Utility/PBar'

const ProductsByCategory = ({
  category,
  subCategory,
  products,
  rowDirection
}) => {
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
      <ProgressBar pixel={category.length * 11.2} />
      <div
        className={`${styles.products} ${rowDirection && styles.productsRow}`}
      >
        {[...products].map((item, index) => (
          <Product
            key={index}
            item={item}
            redirect={true}
            rowDirection={rowDirection}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsByCategory
