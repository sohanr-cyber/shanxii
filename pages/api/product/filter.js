// pages/api/products/filter.js

import db from '@/database/connection'
import Product from '@/database/model/Product'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  try {
    // Extract filter parameters from the query string
    let {
      name,
      minPrice,
      maxPrice,
      categories,
      colors,
      page,
      sortBy, // New parameter for sorting
      sortOrder, // New parameter for sorting order,
      limit = 10
    } = req.query

    // Construct the filter object based on the provided parameters
    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: 'i' } // Case-insensitive search for product name
    }

    if (minPrice && maxPrice && minPrice != 'all' && maxPrice != 'all') {
      filter.priceWithDiscount = { $gte: minPrice, $lte: maxPrice } // Filter products by price range
    } else if (minPrice && minPrice != 'all') {
      filter.priceWithDiscount = { $gte: minPrice } // Filter products with price greater than or equal to minPrice
    } else if (maxPrice && maxPrice != 'all') {
      filter.priceWithDiscount = { $lte: maxPrice } // Filter products with price less than or equal to maxPrice
    }

    if (categories && categories != 'all') {
      filter.categories = { $in: categories.split(',') } // Filter products by category
    }

    if (colors && colors != 'all') {
      filter.color = { $in: colors.split(',') } // Filter products by color
    }

    page = page || 1
    const skip = (page - 1) * limit
    console.log({ filter })
    await db.connect()

    // Query the database with the constructed filter object
    const count = await Product.countDocuments(filter)
    const totalPages = Math.ceil(count / limit)
    let query = await Product.find(filter, {
      metaTitle: 0,
      images: 0
    })
      .populate({
        path: 'categories',
        select: 'name'
      })
      .skip(skip)
      .limit(parseInt(limit))

    // Sorting
    if (sortBy && sortOrder) {
      let sortOptions = {}
      if (sortOrder === 'desc') {
        sortOptions[sortBy] = -1 // Sort in descending order
      } else {
        sortOptions[sortBy] = 1 // Sort in ascending order
      }
      console.log(sortOptions)
      query = query.sort({
        createdAt: '-1'
      })
    }

    const products = query

    return res.status(200).json({ totalPages, count, page, products })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
