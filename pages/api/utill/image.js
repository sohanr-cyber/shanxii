import UserService from '@/services/user-service'
import { isAuth } from '@/utility'
import nextConnect from 'next-connect'
import { getPlaceholderImage } from '@/utility/image'
const handler = nextConnect()

handler.post(async (req, res) => {
  const products = req.body.products
  try {
    const productsWithBlurData = await Promise.all(
      products.map(async p => {
        const blurData = await getPlaceholderImage(p.thumbnail)
        return {
          ...p.toObject(), // Ensure you're working with plain objects
          blurData: blurData.placeholder
        }
      })
    )
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

export default handler
