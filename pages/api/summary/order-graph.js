import db from '@/database/connection'
import Order from '@/database/model/Order'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import { addDays } from 'date-fns'

const handler = nc()

// Helper function to sort data by date in ascending order
function sortDataByDate(data) {
  const entries = Object.entries(data)
  entries.sort((a, b) => new Date(a[0]) - new Date(b[0]))
  return Object.fromEntries(entries)
}

// handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  const { period } = req.query // 'day', 'week', or 'month'

  // Determine the time range based on the period
  let startDate
  let dateFormat

  switch (period) {
    case 'week':
      startDate = addDays(new Date(), -9) // Last 7 days
      dateFormat = '%Y-%m-%d' // Daily aggregation
      break
    case 'month':
      startDate = addDays(new Date(), -30) // Last 30 days
      dateFormat = '%Y-%m-%d' // Daily aggregation for 30 days
      break
    case 'day':
      startDate = addDays(new Date(), -1) // Just for today
      dateFormat = '%Y-%m-%d' // Daily aggregation
      break
    default:
      startDate = addDays(new Date(), -30) // Default to last 30 days if no period specified
      dateFormat = '%Y-%m-%d' // Default format (day level)
      break
  }

  try {
    await db.connect()

    // Aggregate orders from the last N days (7 or 30 days) based on the period
    const orderData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate } // Filter by startDate
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: dateFormat, date: '$createdAt' } }, // Group by the selected format
            status: '$status' // Group by status
          },
          count: { $sum: 1 } // Count the number of orders for each group
        }
      }
    ])

    console.log({ orderData })

    // Restructure the data into a suitable format for graphical representation
    const graphicalData = {}
    orderData.forEach(({ _id, count }) => {
      const { date, status } = _id
      if (!graphicalData[date]) {
        graphicalData[date] = { total: 0 } // Initialize the date entry
      }
      graphicalData[date][status] = count // Add the count for each status
      graphicalData[date].total += count // Update the total count for the date
    })

    // Sort the data by date and send the response
    res.status(200).json(sortDataByDate(graphicalData))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  } finally {
    await db.disconnect()
  }
})

export default handler
