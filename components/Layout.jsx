import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import BottomFooter from './BottomFooter'
import { useDispatch, useSelector } from 'react-redux'
import { containsAdmin } from '@/utility/helper'
import { Router, useRouter } from 'next/router'
import AdminNavbar from './Admin/Navbar'
import Loading from './Utility/Loading'
import { useSnackbar } from 'notistack'
import { setCategories } from '@/redux/categorySlice'
import axios from 'axios'
import { setPixel } from '@/redux/pixelSlice'
import { PIXEL_ID } from '@/config'
import ChatButton from './Chat/ChatButton'
import Navbar from './Navbar'
import Navbar2 from './Navs/Navbar2'
import styles from '@/styles/Layout.module.css'
import { setCurrentChat } from '@/redux/chatSlice'
import ChatArea from './Chat/ChatArea'
import Nested from './Categories/Explore/Nested'

const Layout = ({ children }) => {
  const loading = useSelector(state => state.state.loading)
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const notistack = useSelector(state => state.notistack.notistack)
  const fetchAgain = useSelector(state => state.category.fetchAgain)
  const currentChat = useSelector(state => state.chat.currentChat)
  const userInfo = useSelector(state => state.user.userInfo)

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
  }, [fetchAgain])

  React.useEffect(() => {
    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        const options = {
          autoConfig: false, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
          debug: false // enable logs
        }
        console.log({ PIXEL_ID })
        ReactPixel.init(PIXEL_ID, {}, options)
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
      {!containsAdmin(router.asPath) ? (
        <>
          {' '}
          <div className={styles.nav1}>
            <Navbar />
          </div>
          <div className={styles.nav2}>
            <Navbar2 />
          </div>
        </>
      ) : (
        <AdminNavbar />
      )}
      {/* <Nested /> */}
      {children}
      <Footer />
      <BottomFooter />
      {!containsAdmin(router.asPath) && currentChat?._id ? <ChatArea /> : <ChatButton />}
      {loading && <Loading />}
    </div>
  )
}

export default Layout
