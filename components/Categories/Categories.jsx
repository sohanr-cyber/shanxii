import React, { useState } from 'react'
import styles from '../../styles/Categories.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ListIcon from '@mui/icons-material/List'
import CategoryList from './CategoryList'

const Categories = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.select__category}>
          <ListIcon />
          Categories
          <KeyboardArrowDownIcon onClick={() => setOpen(prev => !prev)} />
        </div>
        <div className={styles.items}>
          {['Men', 'Woman', 'Winter', 'Shoes', 'Summer', 'Kids'].map(
            (item, index) => (
              <div className={styles.item} key={index}>
                {item}
              </div>
            )
          )}
        </div>
      </div>
      {open && (
        <div className={styles.categories}>
          <CategoryList />
        </div>
      )}
    </div>
  )
}

export default Categories
