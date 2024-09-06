// pages/api/revenue/graphical-data.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'

const handler = nc()

// handler.use(isAuth, isAdmin)
// retrieve totalOrders , totalPending , totalConfirmed , totalCompleted , total Paid
handler.get(async (req, res) => {
  try {
    await db.connect()

    // Aggregate orders and calculate totals for different categories and sums
    const orderSummary = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalOrderAmount: { $sum: '$total' }, // Sum of total for all orders

          totalPending: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
          },
          totalPendingAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, '$total', 0] }
          },

          totalConfirmed: {
            $sum: { $cond: [{ $eq: ['$status', 'Confirmed'] }, 1, 0] }
          },
          totalConfirmedAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Confirmed'] }, '$total', 0] }
          },

          totalDelivered: {
            $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] }
          },
          totalDeliveredAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, '$total', 0] }
          },

          totalFailed: {
            $sum: { $cond: [{ $eq: ['$status', 'Failed'] }, 1, 0] }
          },
          totalFailedAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Failed'] }, '$total', 0] }
          },
          totalCanceled: {
            $sum: { $cond: [{ $eq: ['$status', 'Canceled'] }, 1, 0] }
          },
          totalCanceledAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Canceled'] }, '$total', 0] }
          },
          totalDelivering: {
            $sum: { $cond: [{ $eq: ['$status', 'Delivering'] }, 1, 0] }
          },
          totalDeliveringAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Delivering'] }, '$total', 0] }
          }

          // totalPaid: {
          //   $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] }
          // },
          // totalPaidAmount: {
          //   $sum: {
          //     $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$total', 0]
          //   }
          // }
        }
      }
    ])

    // Extract the totals from the result
    const summary = orderSummary.length > 0 ? orderSummary[0] : null
    console.log({ summary })

    await db.disconnect()
    return res.status(200).json(summary)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
