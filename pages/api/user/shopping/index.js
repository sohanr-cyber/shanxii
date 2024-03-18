import nextConnect from 'next-connect'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import User from '@/database/model/User'
import Product from '@/database/model/Product'

const handler = nextConnect()

// add to wishlist or remove from wishlist
handler.post(async (req, res) => {
  try {
    const { userId, productId } = req.body

    // Check if both userId and productId are provided
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'Both userId and productId are required' })
    }

    // Check if user exists
    const user = await User.findById({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if product exists
    const product = await Product.findById({ _id: productId })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Check if product is already in wishlist
    const index = user.wishlist.indexOf(productId)
    if (index !== -1) {
      // Remove product from wishlist
      user.wishlist.splice(index, 1)
      await user.save()
      return res.status(400).json({ message: 'Product removed from wishlist' })
    } else {
      // Add product to wishlist
      user.wishlist.push(productId)
      await user.save()

      return res
        .status(201)
        .json({ message: 'Product added to wishlist successfully' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})


export default handler
