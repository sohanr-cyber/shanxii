import db from '@/database/connection'
import Product from '@/database/model/Product'
import Category from '@/database/model/Category'
import UserService from '@/services/user-service'
import { isAuth } from '@/utility'
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

    // console.log({ existingCoupon })
    // Assuming currentDate is already defined as the current date
    const currentDate = new Date()

    // Convert existingCoupon.startDate and existingCoupon.expiryDate to Date objects
    const startDate = new Date(existingCoupon.startDate)
    const expiryDate = new Date(existingCoupon.expiryDate)

    // Check if the current date is outside the validity period of the coupon code
    if (currentDate < startDate || currentDate > expiryDate) {
      return res
        .status(200)
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
