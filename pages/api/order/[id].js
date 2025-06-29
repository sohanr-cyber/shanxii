// pages/api/orders/[id]/update-status.js
import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import nc from 'next-connect'
import Address from '@/database/model/Address'
import Mail from '@/services/mail-service'
import { isAdmin, isAuth } from '@/utility'
const handler = nc()

handler.get(async (req, res) => {
  try {
    const { id } = req.query // Get order ID from the request URL
    await db.connect()
    // Find the order by its ID and populate the 'items.product' field with product details
    const order = await Order.findById(id)
      .populate({
        path: 'items.product',
        select: 'name slug  price discount priceWithDiscount  productType thumbnail '
      })
      .populate({
        path: 'shippingAddress',
        select: 'address'
      })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    await db.disconnect()
    res.status(200).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// change order status by admin
handler.use(isAuth, isAdmin)
handler.put(async (req, res) => {
  const { id: orderId } = req.query
  const { newStatus } = req.body

  // send mail
  const mail = new Mail()

  try {
    await db.connect()
    const order = await Order.findById(orderId)
      .populate({
        path: 'items.product',
        select: 'name slug  price priceWithDiscount discount color thumbnail '
      })
      .populate({
        path: 'shippingAddress',
        select: 'address email fullName phone'
      })

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

    // confirming order deduce product quantity
    if (newStatus == 'Confirmed') {
      await Promise.all(
        order.items.map(async item => {
          const { product: productId, quantity, variant } = item;
          const product = await Product.findOne({ _id: productId });

          if (!product) {
            console.error(`Product not found for id: ${productId}`);
            return;
          }

          product.stockQuantity -= quantity;
          product.sold += quantity;

          if (product.productType == "variable" && variant?.uid) {
            const v = product.variants.find(v => v.uid == variant.uid);
            console.log({v})
            if (v) {
              v.sold += 1;
              v.quantity -= quantity;
            } else {
              console.error(`Variant not found for uid: ${variant.uid}`);
            }
          }

          await product.save();
          return { product: productId };
        })
      );
    }


    // failed or canceled order + product stock quantity
    if (newStatus == 'Failed' || newStatus == 'Canceled') {
      Promise.all(
        order.items.map(async item => {
          const { product: productId, quantity } = item
          const product = await Product.findOne({ _id: productId })
          product.stockQuantity += quantity
          product.sold -= quantity
          await product.save()
          return {
            product: productId
          }
        })
      )
    }

    // delivering make payment status completed
    if (newStatus == 'Delivered') {
      order.paymentStatus = 'completed'
    }

    await order.save()
    // await db.disconnect()
    // send mail based on status
    if (order.shippingAddress.email) {
      let leanOrder = order.toObject()

      if (newStatus == 'Confirmed') {
        mail.sendMail({
          subject: 'Your Order Have Been Confirmed',
          for: 'orderConfirmed',
          ...leanOrder.shippingAddress,
          name: order.shippingAddress.fullName,
          to: order.shippingAddress.email,
          orderId: order._id,
          ...leanOrder
        })
      }

      if (newStatus == 'Canceled') {
        mail.sendMail({
          subject: 'Your Order Have Been Cancelled',
          for: `order${newStatus}`,
          ...leanOrder.shippingAddress,
          name: order.shippingAddress.fullName,
          to: order.shippingAddress.email,
          orderId: order._id,
          ...leanOrder
        })
      }

      if (newStatus == 'Failed') {
        mail.sendMail({
          subject: 'Your Order Have Been Failed',
          for: `order${newStatus}`,
          ...leanOrder.shippingAddress,
          name: order.shippingAddress.fullName,
          to: order.shippingAddress.email,
          orderId: order._id,
          ...leanOrder
        })
      }

      if (newStatus == 'Delivered') {
        mail.sendMail({
          subject: 'Your Order Have Been Delivered',
          for: 'orderDelivered',
          ...leanOrder.shippingAddress,
          name: order.shippingAddress.fullName,
          to: order.shippingAddress.email,
          orderId: order._id,
          ...leanOrder
        })
      }
    }

    res.json({
      message: `Order status updated from ${currentStatus} to ${newStatus}`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Delete Order by Id
handler.delete(async (req, res) => {
  try {
    await db.connect()
    const deleted = await Order.deleteOne({ _id: req.query.id })
    await db.disconnect()
    return res.status(200).send({ message: 'Order Deleted' })
  } catch (error) {
    return res.status(400).send(error)
  }
})

export default handler
