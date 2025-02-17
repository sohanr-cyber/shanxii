// Import necessary modules and models
import db from '@/database/connection'
import Brand from '@/database/model/Brand'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'
const PAGE_SIZE = 100
const handler = nc()


// get all the brand
handler.get(async (req, res) => {
  try {
    await db.connect()
    // Get the page number from the query parameters, default to 1
    const page = parseInt(req.query.page) || 1

    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * (req.query.pageSize || PAGE_SIZE)
    // Retrieve total count of products
    const totalCount = await Brand.countDocuments()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const brands = await Brand.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)

    await db.disconnect()
    res.json({ page, brands, totalPages })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.use(isAuth, isAdmin)
// Create a new brand
handler.post(async (req, res) => {
  try {
    await db.connect()
    // const exist = await Brand.findOne({ name: req.body.name })
    // if (exist) {
    //   return res.status(200).send({
    //     error: 'Already A Cateory Exist With This Name'
    //   })
    // }
    const brand = await Brand.create({
      ...req.body,
      slug: slugify(req.body.name)
    })
    await db.disconnect()
    res.status(201).json(brand)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})


export default handler
