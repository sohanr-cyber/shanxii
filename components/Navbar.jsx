import React, { useEffect, useState } from 'react'
import styles from '../styles/Navbar.module.css'
import Logo from './Utility/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import SearchBox from './SearchBox'
import { useRouter } from 'next/router'
import Navigator from './User/Navigator'
import { useSelector } from 'react-redux'
import CartItems from './Cart/CartItems'
const Navbar = () => {
  const router = useRouter()
  const [openSearch, setOpenSearch] = useState(false)
  const [open, setOpen] = useState(false)
  const cartItems = useSelector(state => state.cart.items)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={styles.wrapper}>
      {openSearch && (
        <div className={styles.opened__searchBox}>
          <SearchBox />
          <span onClick={() => setOpenSearch(false)}>X</span>
        </div>
      )}

      {open && (
        <div className={styles.navigator}>
          <Navigator /> <span onClick={() => setOpen(false)}>X</span>
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
            <ShoppingCartIcon onClick={() => router.push('/cart')} />
            {isClient && <span>{cartItems.length}</span>}
            {isClient && (
              <div className={styles.cartItems}>
                <CartItems cartItems={cartItems} />
              </div>
            )}
          </div>
          <div
            className={`${styles.item} ${styles.profile}`}
            onClick={() => router.push('/user/8532053205/profile')}
          >
            <AccountCircleIcon />
          </div>
          <div
            className={`${styles.item} ${styles.nav}`}
            onClick={() => setOpen(prev => !prev)}
          >
            <AccountCircleIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
