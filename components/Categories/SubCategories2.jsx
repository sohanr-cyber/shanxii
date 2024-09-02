import React from 'react'
import styles from '@/styles/Category/SubCategories2.module.css'

const SubCategories2 = ({ categories }) => {
  return (
    <div className={styles.wrapper}>
      {categories.length > 0 &&
        categories.map((i, index) => (
          <div className={styles.item}>{i.name}</div>
        ))}
    </div>
  )
}

export default SubCategories2
