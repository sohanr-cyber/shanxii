import db from '@/database/connection'
import Category from '@/database/model/Category'
import Product from '@/database/model/Product'
import nc from 'next-connect'
import { getPlaceholderImage } from '@/utility/image'

const handler = nc()

handler.get(async (req, res) => {
  try {
    await db.connect()

    const fc = await Category.find({ isFeatured: true }).sort({ updatedAt: -1 })

    const pfc = await Promise.all(
      fc.map(async item => {
        const products = await Product.find({ categories: { $in: item._id } })

        const productsWithBlurData = await Promise.all(
          products.map(async p => {
            const blurData = await getPlaceholderImage(p.thumbnail)
            return {
              ...p.toObject(), // Ensure you're working with plain objects
              blurData: blurData.placeholder
            }
          })
        )

        const subCategory = await Category.find({ parent: item._id }).select(
          '_id name'
        )

        return {
          category: item.name,
          subCategory,
          updatedAt: item.updatedAt,
          products: productsWithBlurData
        }
      })
    )

    await db.disconnect()
    return res.status(200).json(pfc)
  } catch (error) {
    console.error('Error fetching featured categories:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default handler
