// pages/api/orders/create.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import Address from '@/database/model/Address'
import nc from 'next-connect'
import { generateTrackingNumber } from '@/utilty/helper'
const handler = nc()
const PAGE_SIZE = 10

handler.post(async (req, res) => {
  try {
    const {
      user,
      items: orderItems,
      shippingAddress,
      billingAddress,
      status,
      paymentMethod,
      paymentReference
    } = req.body
    await db.connect()

    // Fetch product details for each item in the order
    const populatedItems = await Promise.all(
      orderItems.map(async item => {
        const { product: productId, quantity } = item
        const product = await Product.findOne({ _id: productId })

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`)
        }

        // Calculate the total price and discount based on the product's price and discount
        const price = product.price * quantity
        const discount = (product.discount / 100) * price
        return {
          product: productId,
          quantity,
          price,
          discount
        }
      })
    )

    // Calculate order total based on item prices
    const subtotal = populatedItems.reduce((acc, item) => acc + item.price, 0)
    const discount = populatedItems.reduce(
      (acc, item) => acc + item.discount,
      0
    )
    const total = subtotal - discount // Assuming no shipping cost or tax for simplicity

    // Create the new order with the populated item details
    const newOrder = await Order.create({
      user,
      items: populatedItems,
      shippingAddress,
      billingAddress,
      status,
      statusTimeline: [{ status: 'pending' }],
      subtotal,
      discount,
      total,
      paymentMethod,
      paymentReference,
      trackingNumber: generateTrackingNumber()
    })
    await db.disconnect()
    res.status(201).json(newOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.get(async (req, res) => {
  try {
    await db.connect()
    const page = parseInt(req.query.page) || 1

    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * PAGE_SIZE
    // Retrieve total count of products
    const totalCount = await Order.countDocuments()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const orders = await Order.find({})
      .populate({
        path: 'shippingAddress',
        select: 'fullName phone'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
    await db.disconnect()
    res.json({ page, orders, totalPages })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
