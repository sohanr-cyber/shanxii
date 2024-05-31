import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomFooter from './BottomFooter'
import { useSelector } from 'react-redux'
import { containsAdmin } from '@/utility/helper'
import { useRouter } from 'next/router'
import AdminNavbar from './Admin/Navbar'
import Loading from './Utility/Loading'
import { useSnackbar } from 'notistack'

const Layout = ({ children }) => {
  const loading = useSelector(state => state.state.loading)
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const notistack = useSelector(state => state.notistack.notistack)

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
