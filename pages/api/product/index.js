import db from '@/database/connection'
import Product from '@/database/model/Product'
import Category from '@/database/model/Category'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import nextConnect from 'next-connect'
import slugify from 'slugify'
const handler = nextConnect()
const PAGE_SIZE = 20

handler.get(async (req, res) => {
  try {
    await db.connect()
    // Get the page number from the query parameters, default to 1
    const page = parseInt(req.query.page) || 1

    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * PAGE_SIZE
    // Retrieve total count of products
    const totalCount = await Product.countDocuments()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const products = await Product.find()
      .populate({
        path: 'categories',
        select: 'name'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
    await db.disconnect()
    res.json({ page, products, totalPages })
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
