// pages/api/revenue/graphical-data.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'

const handler = nc()

function sortDataByDate (data) {
  // Convert the object to an array of [key, value] pairs
  const entries = Object.entries(data)

  // Sort the entries by the date keys in ascending order
  entries.sort((a, b) => new Date(a[0]) - new Date(b[0]))

  // Convert the sorted array of entries back to an object
  const sortedData = Object.fromEntries(entries)

  return sortedData
}

handler.use(isAuth, isAdmin)
handler.get(async (req, res) => {
  try {
    await db.connect()

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

    console.log({ orderData })

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

    res.status(200).json(sortDataByDate(graphicalData))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
