import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
// import Loading from './utils/Loading'
// import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  //   const loading = useSelector(state => state.state.loading)

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      {/* {loading && <Loading />} */}
    </div>
  )
}

export default Layout
