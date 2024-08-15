import db from '@/database/connection'
import Product from '@/database/model/Product'
import Category from '@/database/model/Category'
import nextConnect from 'next-connect'
import slugify from 'slugify'
import { getPlaceholderImage } from '@/utility/image'

const handler = nextConnect()
handler.get(async (req, res) => {
  try {
    await db.connect()
    const { slug, blur, related } = req.query

    // Fetch the product and ensure it's a plain JavaScript object
    let product = await Product.findOne({ slug }).lean().populate({
      path: 'categories',
      select: 'name _id'
    })

    if (!product) {
      await db.disconnect()
      return res.status(404).json({ message: 'Product not found' })
    }

    // If blur is requested, generate and add the placeholder image
    if (blur) {
      const placeholder = await getPlaceholderImage(product.thumbnail)
      product.placeholder = placeholder.placeholder
    }

    // If related products are requested, fetch them
    // let relatedProducts = [];
    // if (related) {
    //   const categories = product.categories.map(i => i._id);
    //   relatedProducts = await Product.find(
    //     {
    //       categories: { $in: categories },
    //       _id: { $ne: product._id },
    //     },
    //     { metaTitle: 0, images: 0, description: 0 }
    //   )
    //     .lean()
    //     .populate({
    //       path: 'categories',
    //       select: 'name',
    //     });
    // product.relatedProducts = relatedProducts;
    // }

    await db.disconnect()
    return res.status(200).json(product)
  } catch (error) {
    console.error('Error occurred:', error)
    await db.disconnect() // Ensure disconnection in case of an error
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message })
  }
})

handler.put(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(req.body.name) },
      { new: true }
    )
    const upadated = await Product.findOne({ _id: req.query.id }).populate({
      path: 'categories',
      select: 'name _id'
    })
    await db.connect()
    res.json(upadated)
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
