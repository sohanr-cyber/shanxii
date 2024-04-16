import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from '../styles/SearchBox.module.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const SearchBox = () => {
  const router = useRouter()
  const [name, setName] = useState(router.query.name || '')
  const categories = useSelector(state => state.product.categories)
  return (
    <div className={styles.flex}>
      <div className={styles.select__category}>
        <select>
          <option value={'All'}>All</option>
          {categories?.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <input
          type='text'
          placeholder='Search By Product Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div
          className={styles.icon}
          onClick={() => router.push(`/shop?name=${name}`)}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}

export default SearchBox
