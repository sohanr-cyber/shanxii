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

handler.get(async (req, res) => {
  try {
    const orderId = req.query.id

    // if (!orderId) {
    //   return res.status(400).json({ error: 'Order ID is required' })
    // }

    // const updatedOrder = await Order.findByIdAndUpdate(
    //   orderId, // The ID of the order to update
    //   { $set: { paymentStatus: 'completed' } }, // Update the payment status to 'completed'
    //   { new: true } // Return the updated document
    // )

    // console.log('Incoming request to update order:', orderId)

    // NextResponse.redirect(`${BASE_URL}/order/${orderId}`) // Just for testing
    res.status(200).redirect(`/order/${orderId}`)
  } catch (error) {
    console.log(error)
  }
})

export default handler
