import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import Address from '@/database/model/Address'
import nc from 'next-connect'
import { generateTrackingNumber } from '@/utility/helper'
import { isAdmin, isAuth } from '@/utility'
import axios from 'axios'
import BASE_URL from '@/config'

const handler = nc()

const store_id = 'quinc66d679e90b3db'
const store_passwd = 'quinc66d679e90b3db@ssl'
const is_live = false //true for live, false for sandbox

handler.post(async (req, res) => {
  try {
    const { data: order } = await axios.post(
      `${BASE_URL}/api/order/checkout`,
      req.body
    )
    console.log({ order })
    const data = {
      total_amount: order.total,
      currency: 'BDT',
      tran_id: order.trackingNumber, // use unique tran_id for each api call
      success_url: `${BASE_URL}/api/payment/callback/${order._id}`,
      fail_url: `${BASE_URL}/api/payment/callback/canceled?id=${order._id}`,
      cancel_url: `${BASE_URL}/api/payment/callback/canceled?id=${order._id}`,
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh'
    }
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL
      res.status(200).send({ GatewayPageURL })
      console.log('Redirecting to: ', GatewayPageURL)
    })
  } catch (error) {
    console.log(error)
  }
})

handler.put(async (req, res) => {
  try {
  } catch (error) {}
})

export default handler
