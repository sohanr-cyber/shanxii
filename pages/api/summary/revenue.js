// pages/api/revenue.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'

const handler = nc()

db.connect()
handler.get(async (req, res) => {
  try {
    // Calculate total revenue by summing the 'total' field from all orders
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          status: 'Delivered' // Filter orders with completed payment status
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ])

    // Extract total revenue from the result
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0

    res.status(200).json({ revenue })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
