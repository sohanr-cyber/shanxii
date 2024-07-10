// Import necessary modules and models
import db from '@/database/connection'
import Category from '@/database/model/Category'
import nc from 'next-connect'
import slugify from 'slugify'
const PAGE_SIZE = 20
const handler = nc()

// Create a new category
handler.post(async (req, res) => {
  try {
    await db.connect()
    const category = await Category.create({
      ...req.body,
      slug: slugify(req.body.name)
    })
    await db.disconnect()
    res.status(201).json(category)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// get all the category
handler.get(async (req, res) => {
  try {
    await db.connect()
    // Get the page number from the query parameters, default to 1
    const page = parseInt(req.query.page) || 1

    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * (req.query.pageSize || PAGE_SIZE)
    // Retrieve total count of products
    const totalCount = await Category.countDocuments()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)

    await db.disconnect()
    res.json({ page, categories, totalPages })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
