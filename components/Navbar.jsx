import React from 'react'
import styles from '../styles/Navbar.module.css'
import Logo from './Utility/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import SearchBox from './SearchBox'
const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.search}>
          <SearchBox />
        </div>
        <div className={styles.right}>
          <div className={`${styles.item} ${styles.search__icon}`}>
            <SearchIcon />
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
