// pages/api/revenue.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'

const handler = nc()

db.connect()

handler.get(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body
  try {
    // Fetch all orders from the database
    const orders = await Order.find({
      $or: [{ status: orderStatus }, { paymentStatus: paymentStatus }]
    })

    res.status(200).json({ orders })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
