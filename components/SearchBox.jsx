import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from '../styles/SearchBox.module.css'
const SearchBox = () => {
  return (
    <div className={styles.flex}>
      <div className={styles.select__category}>
        <select>
          {['All', 'Men', 'Women', 'Winter', 'Summer', 'Kids', 'Shoes'].map(
            (item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            )
          )}
        </select>
      </div>
      <div className={styles.field}>
        <input type='text' placeholder='Search By Product Name' />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}

export default SearchBox
