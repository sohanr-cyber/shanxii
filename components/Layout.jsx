import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomFooter from './BottomFooter'
// import Loading from './utils/Loading'
// import { useSelector } from 'react-redux'
import { containsAdmin } from '@/utilty/helper'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  //   const loading = useSelector(state => state.state.loading)
  const router = useRouter()
  return (
    <div>
      {!containsAdmin(router.asPath) && <Navbar />}
      {children}
      <Footer />
      <BottomFooter />
    </div>
  )
}

export default Layout
