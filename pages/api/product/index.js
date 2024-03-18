import db from '@/database/connection'
import Product from '@/database/model/Product'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import nextConnect from 'next-connect'
import slugify from 'slugify'
const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const products = await Product.find()
    await db.disconnect()
    res.json(products)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.post(async (req, res) => {
  try {
    await db.connect()
    const product = new Product({
      ...req.body,
      slug: slugify(req.body.name)
    })
    await product.save()
    await db.disconnect()
    res.status(201).json(product)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
