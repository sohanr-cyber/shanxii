import React, { useState } from 'react'
import styles from '../../styles/Shop/Shop.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import GridViewIcon from '@mui/icons-material/GridView'
import Product from '@/components/Product'
import FilterSearch from '@/components/Shop/FilterSearch'
const Home = () => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      {open && <FilterSearch />}
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.filter}>
            <FilterAltIcon />
            Filter
          </div>
        </div>
        <div className={styles.right}>
          <GridViewIcon />
        </div>
      </div>
      <div className={styles.products}>
        {[1, 2, 2, 2, 2, 2, 2].map((item, index) => (
          <Product key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home
