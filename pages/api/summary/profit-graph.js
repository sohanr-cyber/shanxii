import db from '@/database/connection'
import Order from '@/database/model/Order'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'

const handler = nc()

// handler.use(isAuth, isAdmin)
handler.get(async (req, res) => {
  const { period } = req.query // Expecting 'day', 'week', or 'month' as query parameters

  // Define format based on the period parameter
  let dateFormat
  switch (period) {
    case 'day':
      dateFormat = '%Y-%m-%d' // Format for day
      break
    case 'week':
      dateFormat = '%Y-%U' // Format for week (U is the week of the year)
      break
    case 'month':
    default:
      dateFormat = '%Y-%m' // Default to month if no valid period is provided
      break
  }

  try {
    await db.connect()

    // Aggregate orders based on the period (day, week, or month)
    const revenueData = await Order.aggregate([
      {
        $match: {
          status: 'Delivered' // Only include orders with the 'Delivered' status
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
          revenue: { $sum: '$total' }, // Sum the total field for revenue calculation
          count: { $sum: 1 } // Count the number of orders
        }
      },
      {
        $sort: { _id: 1 } // Sort by the date (ascending order)
      }
    ])

    // Format the result to make it more suitable for graphical representation
    // const graphicalData = revenueData.map(({ _id, revenue, count }) => ({
    //   period: _id,
    //   revenue,
    //   orderCount: count
    // }))

    await db.disconnect()

    return res.status(200).json(revenueData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
