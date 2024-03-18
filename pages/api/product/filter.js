// pages/api/products/filter.js

import db from '@/database/connection'
import Product from '@/database/model/Product'
import nc from 'next-connect'

const handler = nc()

db.connect()

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
      limit = 10
    } = req.query

    // Construct the filter object based on the provided parameters
    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: 'i' } // Case-insensitive search for product name
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: minPrice, $lte: maxPrice } // Filter products by price range
    } else if (minPrice !== undefined) {
      filter.price = { $gte: minPrice } // Filter products with price greater than or equal to minPrice
    } else if (maxPrice !== undefined) {
      filter.price = { $lte: maxPrice } // Filter products with price less than or equal to maxPrice
    }

    if (categories) {
      filter.categories = { $in: categories.split(',') } // Filter products by category
    }

    if (colors) {
      console.log(colors)
      filter.color = { $in: colors.split(',') } // Filter products by color
    }

    page = page || 1
    const skip = (page - 1) * limit

    // Query the database with the constructed filter object
    const count = await Product.countDocuments(filter)
    const totalPages = Math.ceil(count / limit)
    const products = await Product.find(filter, {
      metaTitle: 0,
      images: 0
    })
      .skip(skip)
      .limit(parseInt(limit))
      .exec()

    res.status(200).json({ totalPages, count, page, products })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
