// Import necessary modules and models
import db from '@/database/connection'
import Category from '@/database/model/Category'
import nc from 'next-connect'
import slugify from 'slugify'
const PAGE_SIZE = 20
const handler = nc()

// get all the category
handler.get(async (req, res) => {
  try {
    await db.connect()
    // Get the page number from the query parameters, default to 1
    // const page = parseInt(req.query.page) || 1

    // Calculate the skip value based on the page number and page size
    // const skip = (page - 1) * (req.query.pageSize || PAGE_SIZE)
    // Retrieve total count of products
    // const totalCount = await Category.countDocuments()

    // Calculate total pages
    // const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const categories = await Category.find({ parent: null })
    const tree = await Promise.all(
      categories.map(async item => {
        const { _id, name } = item
        const c = await Category.find({ parent: _id })

        const subtree = await Promise.all(
          c.map(async item => {
            const { _id, name } = item
            const sc = await Category.find({ parent: _id })
            return {
              name: name,
              _id: _id,
              children: sc
            }
          })
        )

        return {
          name: name,
          _id: _id,
          children: subtree
        }
      })
    )

    await db.disconnect()
    res.json(tree)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
