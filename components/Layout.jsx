import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomFooter from './BottomFooter'
import { useSelector } from 'react-redux'
import { containsAdmin } from '@/utilty/helper'
import { useRouter } from 'next/router'
import AdminNavbar from './Admin/Navbar'
import Loading from './Utility/Loading'

const Layout = ({ children }) => {
  const loading = useSelector(state => state.state.loading)
  const router = useRouter()
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
