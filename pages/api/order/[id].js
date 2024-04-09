// pages/api/orders/[id]/update-status.js
import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import nc from 'next-connect'
import Address from '@/database/model/Address'

const handler = nc()

db.connect()

handler.get(async (req, res) => {
  try {
    const { id } = req.query // Get order ID from the request URL
    await db.connect()
    // Find the order by its ID and populate the 'items.product' field with product details
    const order = await Order.findById(id)
      .populate({
        path: 'items.product',
        select: 'name slug  price discount color thumbnail '
      })
      .populate({
        path: 'shippingAddress',
        select: 'address'
      })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.put(async (req, res) => {
  const { id: orderId } = req.query
  const { newStatus } = req.body

  try {
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    if (
      order.status == 'Delivered' ||
      order.status == 'Failed' ||
      order.status == 'Canceled'
    ) {
      return res.status(400).json({ message: 'Status is not Changeable' })
    }

    const currentStatus = order.status

    // Check if the new status is different from the current status
    if (order.status === newStatus) {
      return res
        .status(400)
        .json({ message: 'New status is same as current status' })
    }

    // Check if the status timeline already contains the new status
    const statusExists = order.statusTimeline.some(
      entry => entry.status === newStatus
    )

    if (!statusExists) {
      order.statusTimeline.push({
        status: newStatus,
        timestamp: Date.now()
      })
    } else {
      return res
        .status(400)
        .json({ message: 'New status is same as Previous status' })
    }

    // Update the order status
    order.status = newStatus

    if (newStatus == 'Confirmed') {
      await Promise.all(
        order.items.map(async item => {
          const { product: productId, quantity } = item
          const product = await Product.findOne({ _id: productId })
          product.stockQuantity -= quantity
          await product.save()
          return {
            product: productId
          }
        })
      )
    }

    if (newStatus == 'Failed' || newStatus == 'Canceled') {
      await Promise.all(
        order.items.map(async item => {
          const { product: productId, quantity } = item
          const product = await Product.findOne({ _id: productId })
          product.stockQuantity += quantity
          await product.save()
          return {
            product: productId
          }
        })
      )
    }
    
    await order.save()

    res.json({
      message: `Order status updated from ${currentStatus} to ${newStatus}`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default handler
