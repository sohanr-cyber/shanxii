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
    const { slug } = req.query // Use slug instead of id
    let product = await Product.findOne({ slug }).populate({
      path: 'categories',
      select: 'name _id'
    })
    await db.disconnect()
    console.log(product)
    if (product) {
      const placeholder = await getPlaceholderImage(product.thumbnail)

      // Ensure the product is a plain object
      product = product.toObject()
      product.placeholder = placeholder.placeholder
      res.status(200).send(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
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
