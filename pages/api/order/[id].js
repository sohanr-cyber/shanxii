// pages/api/orders/[id]/update-status.js
import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import nc from 'next-connect'

const handler = nc()

db.connect()

handler.get(async (req, res) => {
  try {
    const { id } = req.query // Get order ID from the request URL

    // Find the order by its ID and populate the 'items.product' field with product details
    const order = await Order.findById(id).populate({
      path: 'items.product',
      select: 'name slug  price discount color thumbnail '
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
  try {
    const { id } = req.query // Get order ID from the request URL
    const { status } = req.body // Get the new status from the request body

    // Find the order by its ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(updatedOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.patch(async (req, res) => {
  try {
    const { id } = req.query // Get order ID from the request URL
    const { paymentStatus } = req.body // Get the new status from the request body

    // Find the order by its ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(updatedOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
