// pages/api/orders/create.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import nc from 'next-connect'
import {
  calculateSubtotal,
  generateTrackingNumber,
  getDeliveryCharge,
  getPrice
} from '@/utility/helper'
import Address from '@/database/model/Address'
import Coupon from '@/database/model/Coupon'
import Mail from '@/services/mail-service'
const handler = nc()
const Delivery = 50
const mail = new Mail()

handler.post(async (req, res) => {
  try {
    const {
      user,
      items: orderItems,
      shippingAddress,
      billingAddress,
      status,
      paymentMethod,
      paymentReference,
      code
    } = req.body

    await db.connect()

    let discount = 0
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
          order: { product: productId, quantity, price, discount, size, color },
          item: {
            product,
            quantity,
            price,
            discount,
            size,
            color
          }
        }
      })
    )

    console.log(populatedItems.map(i => i.item))
    const subtotal = populatedItems
      .map(i => i.order)
      .reduce((acc, item) => {
        // Calculate total price for each item (considering discount)
        const totalPrice =
          item.price * item.quantity * (1 - item.discount / 100)
        return acc + totalPrice
      }, 0)

    let total = subtotal + getDeliveryCharge(address.position)

    if (code) {
      const currentDate = new Date()
      const existingCoupon = await Coupon.findOne({ code })
      if (
        existingCoupon &&
        !(
          currentDate < existingCoupon.startDate ||
          currentDate > existingCoupon.expiryDate
        )
      ) {
        discount =
          existingCoupon.discountType == 'percentage'
            ? getPrice(subtotal) -
              getPrice(subtotal, existingCoupon.discountValue)
            : getDeliveryCharge(address.position)
      } else {
        return status(200).send({ error: 'Coupon is Invalid or Expired !' })
      }
    }

    total = total - discount

    // Create the new order with the populated item details
    const newOrder = await Order.create({
      user,
      items: populatedItems.map(i => i.order),
      shippingAddress: address._id,
      billingAddress: address._id,
      status,
      statusTimeline: [{ status }],
      subtotal,
      discount,
      total,
      paymentMethod,
      paymentReference,
      shippingCost: getDeliveryCharge(address.position),
      trackingNumber: generateTrackingNumber()
    })

    res.status(200).json(newOrder)

    newOrder &&
      address.email &&
      (await mail.sendMail({
        subject: 'Your Order Is Being Processed',
        for: 'orderProcessing',
        to: address.email,
        name: address.fullName,
        phone: address.phone,
        email: address.email,
        address: address.address,
        shippingCost: newOrder.shippingCost,
        paymentMethod: newOrder.paymentMethod,
        paymentStatus: newOrder.paymentStatus,

        trackingNumber: newOrder.trackingNumber,
        total: newOrder.total,
        subtotal: newOrder.subtotal,
        discount: newOrder.discount,
        items: populatedItems.map(i => i.item),
        orderId: newOrder._id
      }))
  } catch (error) {
    console.log(error)
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
