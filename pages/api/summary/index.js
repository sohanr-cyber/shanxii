import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { convertToCamelCase, dateDevider, getTime } from '@/utility/helper'
import { isAdmin, isAuth } from '@/utility'

const handler = nc()

function getSummary (data, date) {
  let total = 0
  let totalAmount = 0
  let pending = 0
  let pendingAmount = 0
  let failed = 0
  let failedAmount = 0
  let canceled = 0
  let canceledAmount = 0
  let delivering = 0
  let deliveringAmount = 0
  let delivered = 0
  let deliveredAmount = 0
  let confirmed = 0
  let confirmedAmount = 0
  let failedAndCanceled = 0
  let failedAndCanceledAmount = 0

  data.forEach(i => {
    total += 1
    totalAmount += i.total
    if (i.status === 'Pending') {
      pending += 1
      pendingAmount += i.total
    }
    if (i.status === 'Confirmed') {
      confirmed += 1
      confirmedAmount += i.total
    }
    if (i.status === 'Delivering') {
      delivering += 1
      deliveringAmount += i.total
    }
    if (i.status === 'Delivered') {
      delivered += 1
      deliveredAmount += i.total
    }
    if (i.status === 'Canceled') {
      canceled += 1
      canceledAmount += i.total
      failedAndCanceled += 1
      failedAndCanceledAmount += 1
    }
    if (i.status === 'Failed') {
      failed += 1
      failedAmount += i.total
      failedAndCanceled += 1
      failedAndCanceledAmount += 1
    }
  })

  return {
    date,
    total,
    totalAmount,
    pending,
    pendingAmount,
    failed,
    failedAmount,
    canceled,
    canceledAmount,
    delivering,
    deliveringAmount,
    delivered,
    deliveredAmount,
    confirmed,
    confirmedAmount,
    failedAndCanceled,
    failedAndCanceledAmount
  }
}

handler.use(isAuth, isAdmin)
handler.get(async (req, res) => {
  let { period, startDate, endDate } = req.query
  period = period && convertToCamelCase(period)
  let dateFilter = {}

  const now = new Date()

  // Handle different period cases
  if (period === 'last_3_days') {
    dateFilter = {
      createdAt: { $gte: new Date(now.setDate(now.getDate() - 3)) }
    }
  } else if (period === 'last_7_days') {
    dateFilter = {
      createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) }
    }
  } else if (period === 'last_month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    dateFilter = { createdAt: { $gte: startOfMonth, $lt: endOfMonth } }
  } else if (period == 'custom' && startDate && endDate) {
    dateFilter = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }
  }
  try {
    await db.connect()

    let orders = await Order.find(
      dateFilter,

      {
        items: 0,
        shippingAddress: 0,
        billingAddress: 0,
        statusTimeline: 0,
        trackingNumber: 0,
        paymentReference: 0,
        paymentMethod: 0,
        tax: 0,
        shippingCost: 0,
        discount: 0,
        subtotal: 0,
        transactionId: 0
      }
    )

    if (orders.length === 0) {
      return res.status(200).json([]) // Return empty if no orders
    }

    let startDate = new Date(orders[0].createdAt)
    startDate.setUTCHours(0, 0, 0, 0)

    let endDate = new Date(orders[orders.length - 1].createdAt)
    endDate.setUTCHours(0, 0, 0, 0)

    // Calculate the difference in time (milliseconds)
    let timeDiff = endDate - startDate

    // Convert the time difference to days
    let daysDiff = timeDiff / (1000 * 60 * 60 * 24)
    let diff = dateDevider(daysDiff)

    console.log(`Number of days between startDate and endDate: ${daysDiff}`)

    let dateList = []
    let currentDay = new Date(startDate)

    while (currentDay <= endDate) {
      dateList.push(new Date(currentDay)) // Push a copy of currentDay
      currentDay.setUTCDate(currentDay.getUTCDate() + diff) // Move to next day
    }

    let newOrders = []

    dateList.forEach((date, index) => {
      if (index + 1 < dateList.length) {
        const startOfDay = dateList[index]
        const endOfDay = new Date(dateList[index + 1]) // Create a new Date object for the next day

        newOrders.push(
          getSummary(
            orders.filter(
              e => e.createdAt >= startOfDay && e.createdAt < endOfDay
            ),
            getTime(startOfDay).split(' ')[0]
          )
        )
      }
    })

    // Handle the last date separately
    const lastDate = dateList[dateList.length - 1]
    newOrders.push(
      getSummary(
        orders.filter(e => e.createdAt >= lastDate),
        getTime(lastDate).split(' ')[0]
      )
    )

    res.status(200).json(newOrders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  } finally {
    await db.disconnect()
  }
})

export default handler
