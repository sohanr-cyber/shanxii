import React, { useEffect, useState } from 'react'
import styles from '@/styles/Navbar.module.css'
import Logo from '@/components/Utility/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import SearchBox from '@/components/SearchBox'
import { useRouter } from 'next/router'
import Navigator from '@/components/User/Navigator'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from '@/components/Cart/CartItems'
import { setCategories } from '@/redux/categorySlice'
import axios from 'axios'
import userSlice from '@/redux/userSlice'
import MenuIcon from '@mui/icons-material/Menu'
import CategoriesSlider from '@/components/Categories/CategoriesSlider'
import { showSnackBar } from '@/redux/notistackSlice'

const Navbar = () => {
  const router = useRouter()
  const [openSearch, setOpenSearch] = useState(false)
  const [open, setOpen] = useState(false)
  const cartItems = useSelector(state => state.cart.items)
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.userInfo)

  const redirectToCart = () => {
    if (cartItems.length < 1) {
      dispatch(
        showSnackBar({
          message: 'Your Cart Is Empty',
          option: {
            variant: 'info'
          }
        })
      )
      return
    }
    router.push('/cart')
  }
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
          <CategoriesSlider setOpen={setOpen} />{' '}
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
          <div
            className={`${styles.item} ${styles.search__icon}`}
            onClick={() => setOpenSearch(true)}
          >
            <SearchIcon />
          </div>
          <div className={styles.item}>
            <ShoppingCartIcon onClick={() => redirectToCart()} />
            {isClient && cartItems.length > 0 && (
              <span>{cartItems.length}</span>
            )}
            {isClient && cartItems.length > 0 && (
              <div className={styles.cartItems}>
                <CartItems cartItems={cartItems} />
              </div>
            )}
          </div>
          {isClient && userInfo?.role == 'admin' && (
            <div className={styles.item} onClick={() => router.push('/admin')}>
              <AccountCircleIcon />
            </div>
          )}
          <div
            className={`${styles.item} ${styles.menu}`}
            onClick={() => setOpen(prev => !prev)}
          >
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
