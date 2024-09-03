import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { isAuth } from '@/utility'
import BASE_URL from '@/config'

const handler = nc()

const store_id = 'quinc66d679e90b3db'
const store_passwd = 'quinc66d679e90b3db@ssl'
const is_live = false // true for live, false for sandbox

handler.post(async (req, res) => {
  try {
    const orderId = req.query.id

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' })
    }

    const deleted = await Order.findByIdAndDelete(
      orderId // The ID of the order to update
    )

    console.log('Incoming request to update order:', orderId)
    res.redirect(`${BASE_URL}`) // Just for testing
  } catch (error) {
    console.log(error)
  }
})

export default handler
