import db from '@/database/connection'
import Category from '@/database/model/Category'
import Product from '@/database/model/Product'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const fc = await Category.find({ isFeatured: 'true' }).sort({
      updatedAt: -1
    })
    const pfc = await Promise.all(
      fc.map(async item => {
        const products = await Product.find({ categories: { $in: item._id } })
        return {
          category: item.name,
          updatedAt: item.updatedAt,
          products
        }
      })
    )

    await db.disconnect()
    return res.status(200).send(pfc)
    
  } catch (error) {
    console.log(error)
    return res.status(400).send('server error')
  }
})

export default handler
