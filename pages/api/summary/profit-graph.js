// pages/api/revenue/graphical-data.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'

const handler = nc()

handler.use(isAuth, isAdmin)
handler.get(async (req, res) => {
  try {
    await db.connect()
    // Aggregate orders by month and calculate revenue for each month
    const monthlyRevenueData = await Order.aggregate([
      {
        $match: {
          status: 'Delivered' // Filter orders with completed payment status
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$total' } // Sum total field for revenue calculation
        }
      }
    ])

    // Convert the data to a more suitable format for graphical representation
    const graphicalData = monthlyRevenueData.map(({ _id, revenue }) => ({
      month: _id,
      revenue
    }))

    console.log({ graphicalData })

    await db.disconnect()

    return res.status(200).json(graphicalData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
