import React from 'react'
import styles from '../../styles/Shop/FilterSearch.module.css'
const FilterSearch = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>Filter</div>
        <div className={styles.right}>X</div>
      </div>
    </div>
  )
}

export default FilterSearch
