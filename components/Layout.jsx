import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomFooter from './BottomFooter'
import { useDispatch, useSelector } from 'react-redux'
import { containsAdmin } from '@/utility/helper'
import { Router, useRouter } from 'next/router'
import AdminNavbar from './Admin/Navbar'
import Loading from './Utility/Loading'
import { useSnackbar } from 'notistack'
import { setCategories } from '@/redux/productSlice'
import axios from 'axios'
import { setPixel } from '@/redux/pixelSlice'
const Layout = ({ children }) => {
  const loading = useSelector(state => state.state.loading)
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const notistack = useSelector(state => state.notistack.notistack)
  const dispatch = useDispatch()
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get('/api/category/view')
      dispatch(setCategories(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  React.useEffect(() => {
    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init('1040750500772753')
        dispatch(setPixel(ReactPixel))
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  useEffect(() => {
    if (notistack) {
      enqueueSnackbar(notistack.message, notistack.option || 'default')
    }
  }, [notistack])
  return (
    <div>
      {loading && <Loading />}
      {!containsAdmin(router.asPath) ? <Navbar /> : <AdminNavbar />}
      {children}
      <Footer />
      <BottomFooter />
      {loading && <Loading />}
    </div>
  )
}

export default Layout
