import React, { useState } from 'react'
import styles from '../styles/Navbar.module.css'
import Logo from './Utility/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import SearchBox from './SearchBox'
const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(true)
  return (
    <div className={styles.wrapper}>
      {openSearch && (
        <div className={styles.opened__searchBox}>
          <SearchBox />
          <span onClick={() => setOpenSearch(false)}>X</span>
        </div>
      )}
      <div className={styles.flex}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.search}>
          <SearchBox />
        </div>
        <div className={styles.right}>
          <div className={`${styles.item} ${styles.search__icon}`}>
            <SearchIcon onClick={() => setOpenSearch(true)} />
          </div>
          <div className={styles.item}>
            <ShoppingCartIcon />
          </div>
          <div className={styles.item}>
            <AccountCircleIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
