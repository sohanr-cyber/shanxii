// Import necessary modules and models
import db from '@/database/connection'
import Color from '@/database/model/Misc/Color'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'
const PAGE_SIZE = 100
const handler = nc()


// get all the color
handler.get(async (req, res) => {
  try {
    const { name } = req.query
    await db.connect()
    // Get the page number from the query parameters, default to 1
    const page = parseInt(req.query.page) || 1
    const pageSize  = parseInt(req.query.pageSize) || PAGE_SIZE
    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: 'i' } // Case-insensitive search for product name
    }
    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * (pageSize)
    // Retrieve total count of products
    const totalCount = await Color.countDocuments(filter)

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const colors = await Color.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)

    await db.disconnect()
    res.json({ page, colors, totalPages })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.use(isAuth, isAdmin)
// Create a new color
handler.post(async (req, res) => {
  try {
    await db.connect()
    // const exist = await Color.findOne({ name: req.body.name })
    // if (exist) {
    //   return res.status(200).send({
    //     error: 'Already A Cateory Exist With This Name'
    //   })
    // }
    const color = await Color.create({
      ...req.body,
      slug: slugify(req.body.name)
    })
    await db.disconnect()
    res.status(201).json(color)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})


export default handler
