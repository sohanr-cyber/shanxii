// pages/api/orders/create.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import Address from '@/database/model/Address'
import nc from 'next-connect'
import { generateTrackingNumber } from '@/utility/helper'
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
    const { query, status } = req.query

    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * PAGE_SIZE
    const filter = {}

    // Build the filter conditions for the shippingAddress
    if (query) {
      filter.$or = [
        { fullName: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ]
    }

    console.log({ query, page, PAGE_SIZE, status })

    const addresses = await Address.find(filter).select('_id')
    const addressList = addresses.map(i => i._id)
    // console.log(addressList)
    // Retrieve total count of products

    const orderFilter = { shippingAddress: { $in: addressList } }

    if (
      status != 'all' &&
      status != '' &&
      status != undefined &&
      status != 'undefined'
    ) {
      orderFilter.status = { $regex: status, $options: 'i' }
    }

    // console.log(orderFilter)

    const totalCount = await Order.countDocuments(orderFilter)

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Perform the query with population and filtering
    const orders = await Order.find(orderFilter)
      .populate({
        path: 'shippingAddress',
        select: 'fullName phone' // Select the fields you want to query on
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)

    // console.log({ orders, totalPages, totalCount })
    await db.disconnect()
    return res.status(200).json({ page, totalPages, count: totalCount, orders })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
