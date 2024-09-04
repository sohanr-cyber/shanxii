import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { isAuth } from '@/utility'
import BASE_URL from '@/config'

const handler = nc()

const store_id = process.env.store_id
const store_passwd = process.env.store_passwd
const is_live = process.env.is_live == 'false' ? false : true //true for live, false for sandbox

handler.post(async (req, res) => {
  try {
    console.log('--incomming req')
    // console.log(req.body)
    const { tran_id, val_id, amount, currency_type, status } = req.body
    console.log({ tran_id, val_id, amount, currency_type, status })
    await db.connect()
    const order = await Order.findOne({ trackingNumber: tran_id })
    if (order) {
      order.paymentStatus = 'completed'
      await order.save()
    }
    await db.disconnect()
    return res.status(200).send(`Payment Received For Tran Id: ${tran_id}`)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error })
  }
})

export default handler
