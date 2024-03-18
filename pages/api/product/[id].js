import db from '@/database/connection'
import Product from '@/database/model/Product'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import nextConnect from 'next-connect'
import slugify from 'slugify'

const handler = nextConnect()

handler.put(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(req.body.name) },
      { new: true }
    )
    await db.connect()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.delete(async (req, res) => {
  try {
    await db.connect()

    const { id } = req.query
    await Product.findByIdAndDelete(id)
    await db.connect()

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})
export default handler
