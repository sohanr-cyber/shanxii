import db from '@/database/connection'
import Product from '@/database/model/Product'
import { isAuth, isAdmin } from '@/utility'
import { calculateDiscount, deleteFileFromUrl, getPrice, universalSlugify } from '@/utility/helper'
import { ExtractColors } from '@/utility/image'
import nextConnect from 'next-connect'
import urlSlug from 'url-slug'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const product = await Product.findOne({ _id: req.query.id }).populate({
      path: 'categories',
      select: 'name _id'
    })
    await db.disconnect()
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.use(isAuth, isAdmin)
handler.put(async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query
    console.log({ variants: req.body.variants })

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        // slug: universalSlugify(req.body.name,),
        discount: calculateDiscount(req.body.price, req.body.priceWithDiscount),
        thumbnailColors: await ExtractColors(req.body.thumbnail),
        images: await Promise.all(req.body.images.map(async i => (
          { ...i, colors: await ExtractColors(i.image) }
        )))
      },
      { new: true }
    )
    const upadated = await Product.findOne({ _id: req.query.id }).populate({
      path: 'categories',
      select: 'name _id'
    })
    await db.disconnect()
    res.json(upadated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

handler.delete(async (req, res) => {
  try {
    await db.connect()

    const { id } = req.query
    const product = await Product.findByIdAndDelete(id)


    const deleteThumbnail = async url => {
      if (url) {
        try {
          await deleteFileFromUrl(url)
        } catch (error) {
          console.error(`Error deleting file at ${url}:`, error)
        }
      }
    }

    await Promise.all([
      deleteThumbnail(product.thumbnail),
      product.images.map(i => deleteThumbnail(i))
    ])

    await db.disconnect()

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
})
export default handler
