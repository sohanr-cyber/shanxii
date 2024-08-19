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

    // Aggregate orders by category and calculate total sales for each category
    const salesByCategory = await Order.aggregate([
      {
        $unwind: '$items' // Deconstruct the items array
      },
      {
        $lookup: {
          from: 'products', // Collection to join with
          localField: 'items.product',
          foreignField: '_id',
          as: 'product' // Field to store the joined product data
        }
      },
      {
        $unwind: '$product' // Deconstruct the product array
      },
      {
        $group: {
          _id: '$product.categories', // Group by categories
          totalSales: { $sum: '$items.quantity' } // Calculate total sales for each category
        }
      }
    ])

    // Restructure the data into a suitable format for response
    const salesData = {}
    salesByCategory.forEach(({ _id, totalSales }) => {
      _id.forEach(category => {
        if (!salesData[category]) {
          salesData[category] = 0
        }
        salesData[category] += totalSales
      })
    })

    res.status(200).json(salesData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
