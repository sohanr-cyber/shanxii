import db from '@/database/connection'
import Product from '@/database/model/Product'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import nextConnect from 'next-connect'
import slugify from 'slugify'

const handler = nextConnect()

handler.delete(async (req, res) => {
  try {
    await db.connect()
    await Product.deleteMany({})
    await db.disconnect()
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.post(async (req, res) => {
  try {
    await db.connect()
    const products = req.body // Assuming req.body contains the list of products

    // Check if products array exists and is not empty
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'No products provided' })
    }

    // Create products in the database
    const createdProducts = await Promise.all(
      products.map(async productData => {
        try {
          const product = new Product({
            ...productData,
            slug: slugify(productData.name)
          })
          await product.save()
          return product
        } catch (error) {
          return { error: error.message }
        }
      })
    )

    res.status(201).json(createdProducts)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
