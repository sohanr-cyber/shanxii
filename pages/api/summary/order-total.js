import db from '@/database/connection'
import Order from '@/database/model/Order'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import { subDays } from 'date-fns'
import { convertToCamelCase } from '@/utility/helper'

const handler = nc()

handler.get(async (req, res) => {
  try {
    await db.connect()

    let { filterType, startDate, endDate } = req.query
    let dateFilter = {}

    // Handle query params to set the date filter
    filterType = convertToCamelCase(filterType)
    if (filterType === 'last3months') {
      const threeMonthsAgo = subDays(new Date(), 90) // Last 3 months (approx. 90 days)
      dateFilter = {
        createdAt: {
          $gte: new Date(threeMonthsAgo.setHours(0, 0, 0, 0)), // Set to start of day 90 days ago
          $lte: new Date() // Current date
        }
      }
    } else if (filterType === 'lastmonth') {
      const thirtyDaysAgo = subDays(new Date(), 30) // Last 30 days
      dateFilter = {
        createdAt: {
          $gte: new Date(thirtyDaysAgo.setHours(0, 0, 0, 0)), // Start of last 30 days
          $lte: new Date() // Current date
        }
      }
    } else if (filterType === 'lastweek') {
      const sevenDaysAgo = subDays(new Date(), 7) // Last 7 days
      dateFilter = {
        createdAt: {
          $gte: new Date(sevenDaysAgo.setHours(0, 0, 0, 0)), // Start of last 7 days
          $lte: new Date() // Current date
        }
      }
    } else if (filterType === 'custom' && startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)), // Start of custom range
          $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) // End of custom range
        }
      }
    }

    // Log the date filter for debugging purposes
    console.log('Date Filter:', dateFilter)

    // Aggregate orders with the appropriate date filter
    const orderSummary = await Order.aggregate([
      {
        $match: dateFilter // Apply the date filter
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalOrderAmount: { $sum: '$total' },

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
        }
      }
    ])

    const summary = orderSummary.length > 0 ? orderSummary[0] : null

    await db.disconnect()
    return res.status(200).json(summary)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
