import db from '@/database/connection'
import Product from '@/database/model/Product'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const products = await Product.find({}, { slug: 1, _id: 1 }).lean() // Select only the slug field
    const slugs = products.map(product => product.slug) // Extract slugs from products
    await db.disconnect()
    res.json(products) // Return only the slugs
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
