import db from '@/database/connection'
import Product from '@/database/model/Product'
import Category from '@/database/model/Category'
import UserService from '@/services/user-service'
import { isAdmin, isAuth } from '@/utility'
import nextConnect from 'next-connect'
import slugify from 'slugify'
import Coupon from '@/database/model/Coupon'
const handler = nextConnect()
const PAGE_SIZE = 20

handler.use(isAuth, isAdmin)
handler.get(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ _id: id })
    if (!existingCoupon) {
      return res.status(200).json({ error: 'Coupon code does not exists' })
    }

    await db.disconnect()
    return res.status(201).json(existingCoupon)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
