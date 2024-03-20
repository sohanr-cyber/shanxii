// pages/api/revenue/graphical-data.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'

const handler = nc()

db.connect()

handler.get(async (req, res) => {
  try {
    // Aggregate orders by month and status and calculate the count for each category
    const orderData = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      }
    ])

    // Restructure the data into a suitable format for graphical representation
    const graphicalData = {}
    orderData.forEach(({ _id, count }) => {
      const { month, status } = _id
      if (!graphicalData[month]) {
        graphicalData[month] = { total: 0 }
      }
      graphicalData[month][status] = count
      graphicalData[month].total += count
    })

    res.status(200).json(graphicalData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
