import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { isAuth } from '@/utility'
import BASE_URL from '@/config'
import { NextResponse } from 'next/server'

const handler = nc()

const store_id = process.env.store_id
const store_passwd = process.env.store_passwd
const is_live = process.env.is_live == 'false' ? false : true //true for live, false for sandbox

handler.post(async (req, res) => {
  console.log('----incomming')
  const { tran_id, val_id, amount, currency, status } = req.body
  console.log({ tran_id, val_id, amount, currency, status })
  try {
    const order = await Order.findOne({ trackingNumber: tran_id })
    console.log({ order })
    if (status === 'VALID' && order.total === amount) {
      order.paymentStatus = 'completed'
      await order.save()
      res.status(200).send('Payment status updated')
    } else {
      res.status(400).send('Invalid payment data')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

export default handler
