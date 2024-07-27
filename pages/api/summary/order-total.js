// pages/api/revenue/graphical-data.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'

const handler = nc()

// retrieve totalOrders , totalPending , totalConfirmed , totalCompleted , total Paid
handler.get(async (req, res) => {
  try {
    await db.connect()

    // Aggregate orders and calculate totals for different categories
    const orderSummary = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalPending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },

          totalConfirmed: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          totalCompleted: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          totalPaid: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] }
          }
        }
      }
    ])

    // Extract the totals from the result
    const summary = orderSummary.length > 0 ? orderSummary[0] : null
    console.log({ summary })
    return res.status(200).json(summary)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})
export default handler
