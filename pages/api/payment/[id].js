import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { isAuth } from '@/utility'
import BASE_URL from '@/config'
import { NextResponse } from 'next/server'

const handler = nc()

const store_id = 'quinc66d679e90b3db'
const store_passwd = 'quinc66d679e90b3db@ssl'
const is_live = false // true for live, false for sandbox

//SSLCommerz initiateRefund

handler.get(async (req, res) => {
  const order = await Order.findOne({ _id: req.query.id })
  console.log(order)
  try {
    const data = {
      refund_amount: order.total,
      refund_remarks: '',
      bank_tran_id: order.trackingNumber,
      refe_id: order.trackingNumber
    }
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.initiateRefund(data).then(data => {
      console.log(data)
    })
  } catch (error) {
    console.log(error)
  }
})

export default handler
