import db from '@/database/connection'
import Product from '@/database/model/Product'
import Category from '@/database/model/Category'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import nextConnect from 'next-connect'
import slugify from 'slugify'
import Coupon from '@/database/model/Coupon'
const handler = nextConnect()
const PAGE_SIZE = 20

handler.get(async (req, res) => {
  try {
    await db.connect()
    const { id: code } = req.query

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ code })
    if (!existingCoupon) {
      return res.status(200).json({ error: 'Coupon code does not exists' })
    }

    // Get the current date
    const currentDate = new Date()

    // Check if the current date is within the validity period of the coupon code
    if (
      currentDate < existingCoupon.startDate ||
      currentDate > existingCoupon.expiryDate
    ) {
      return res
        .status(204)
        .json({ error: 'Coupon code is inactive or expired' })
    }

    await db.disconnect()
    return res.status(201).json(existingCoupon)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.put(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      },
      {
        new: true
      }
    )
    if (!existingCoupon) {
      return res.status(400).json({ error: 'Coupon code does not exists' })
    }
    await db.disconnect()
    return res.status(201).json(existingCoupon)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.delete(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOneAndDelete({ _id: id })

    if (!existingCoupon) {
      return res.status(400).json({ error: 'Coupon code does not exists' })
    }
    await db.disconnect()
    return res.status(201).json(existingCoupon)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
