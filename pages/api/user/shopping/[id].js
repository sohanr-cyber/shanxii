import nextConnect from 'next-connect'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'
import User from '@/database/model/User'
import Product from '@/database/model/Product'
import db from '@/database/connection'

const handler = nextConnect()


// get user wishlist 
handler.get(async (req, res) => {
  try {
    const { id: userId } = req.query

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }

    // Check if user exists
    await db.connect()
    const user = await User.findById(userId).populate('wishlist')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await db.disconnect()

    // Fetch user's wishlist
    const wishlist = user.wishlist

    return res.status(200).json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})
export default handler
