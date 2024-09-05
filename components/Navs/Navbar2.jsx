import React, { useEffect, useState } from 'react'
import styles from '@/styles/Navs/Navbar2.module.css'
import Logo from '@/components/Utility/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import SearchBox from '@/components/SearchBox'
import { useRouter } from 'next/router'
import Navigator from '@/components/User/Navigator'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from '@/components/Cart/CartItems'
import { setCategories } from '@/redux/productSlice'
import axios from 'axios'
import userSlice from '@/redux/userSlice'
import MenuIcon from '@mui/icons-material/Menu'
import CategoriesSlider from '@/components/Categories/CategoriesSlider'
import { showSnackBar } from '@/redux/notistackSlice'
import SearchBox2 from '../Search/SearchBox2'

const Navbar2 = () => {
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
      {openSearch && <SearchBox2 setOpen={setOpenSearch} />}
      {open && <CategoriesSlider setOpen={setOpen} />}
      <div className={styles.left}>
        <MenuIcon
          className={styles.icon}
          onClick={() => setOpen(prev => !prev)}
        />
        <SearchIcon
          className={styles.icon}
          onClick={() => setOpenSearch(prev => !prev)}
          style={{ fontSize: '200%', marginTop: '5px' }}
        />
      </div>
      <div className={styles.mid}>
        <Logo />
      </div>
      <div className={styles.right}>
        <div
          className={styles.shoppingCartIcon}
          onClick={() => redirectToCart()}
        >
          <ShoppingCartIcon className={styles.icon} />
          {isClient && cartItems.length > 0 && <span>{cartItems.length}</span>}
          {isClient && cartItems.length > 0 && (
            <div className={styles.cartItems}>
              <CartItems cartItems={cartItems} />
            </div>
          )}{' '}
        </div>
        {isClient && userInfo?.role == 'admin' && (
          <AccountCircleIcon
            className={styles.icon}
            onClick={() => router.push('/admin')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar2
