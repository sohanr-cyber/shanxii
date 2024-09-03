// import { NextResponse } from "next/server";
import { NextResponse } from 'next/server'
import BASE_URL from './config'

export default function middleware (req) {
  let verify = req.cookies.get('userInfo')
  let uri = req.url

  // if (uri.includes('/api/payment/callback')) {
  //   const lst = uri.split('/')
  //   const orderId = lst[lst.length - 1]
  //   return NextResponse.redirect(`${BASE_URL}/api/payment/${orderId}`)
  // }

  // not logged in
  if (!verify && uri.includes('/admin')) {
    return NextResponse.redirect(`${BASE_URL}/login`)
  }

  if (
    verify &&
    JSON.parse(verify.value).role != 'admin' &&
    uri.includes('/admin')
  ) {
    return NextResponse.redirect(`${BASE_URL}/login`)
  }

  // if (verify && uri.includes('/login')) {
  //   return NextResponse.redirect(new URL('/', uri))
  // }
}
