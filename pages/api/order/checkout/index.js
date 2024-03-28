// pages/api/orders/create.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import nc from 'next-connect'
import { calculateSubtotal, generateTrackingNumber } from '@/utilty/helper'
import Address from '@/database/model/Address'
const handler = nc()
const Delivery = 50

db.connect()

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

    const address = await Address.create(shippingAddress)

    // Fetch product details for each item in the order
    const populatedItems = await Promise.all(
      orderItems.map(async item => {
        const { product: productId, quantity, size, color } = item
        const product = await Product.findOne({ _id: productId })

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`)
        }

        // Calculate the total price and discount based on the product's price and discount
        const price = product.price
        const discount = product.discount
        return {
          product: productId,
          quantity,
          price,
          discount,
          size,
          color
        }
      })
    )

    const subtotal = populatedItems.reduce((acc, item) => {
      // Calculate total price for each item (considering discount)
      const totalPrice = item.price * item.quantity * (1 - item.discount / 100)
      return acc + totalPrice
    }, 0)

    let total = subtotal + Delivery

    // Create the new order with the populated item details
    const newOrder = await Order.create({
      user,
      items: populatedItems,
      shippingAddress: address._id,
      billingAddress: address._id,
      status,
      subtotal,
      //   discount,
      total,
      paymentMethod,
      paymentReference,
      trackingNumber: generateTrackingNumber()
    })
    console.log(newOrder)
    res.status(201).json(newOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.get(async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
