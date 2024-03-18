import React, { useState } from 'react'
import styles from '../styles/Navbar.module.css'
import Logo from './Utility/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import SearchBox from './SearchBox'
import { useRouter } from 'next/router'
const Navbar = () => {
  const router = useRouter()
  const [openSearch, setOpenSearch] = useState(false)
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
          <div
            className={styles.item}
            onClick={() => router.push('/user/8532053205/profile')}
          >
            <AccountCircleIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
