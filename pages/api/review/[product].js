// Import necessary modules and the Review model
import nc from 'next-connect'

import Product from '@/database/model/Product'
import Review from '@/database/model/Review'
import db from '@/database/connection'
import User from '@/database/model/User'

// Initialize next-connect handler
const handler = nc()

// Connect to the database
db.connect()

// Create Review API endpoint
handler.post(async (req, res) => {
  try {
    const { rating, content, attachments, name, email } = req.body
    const { product } = req.query
    // Check if the product exists (you should have a Product model and import it)
    const existingProduct = await Product.findOne({ _id: product })
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }



    // Create the review
    const review = await Review.create({
      name, email, product,
      rating,
      content,
      attachments
    })

    res.status(201).json(review)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Get All Reviews API endpoint
handler.get(async (req, res) => {
  try {
    const { product: productId } = req.query

    // Find all reviews associated with the specified product
    const reviews = await Review.find({ product: productId }).populate({
      path: "user",
      select: "_id firstName"
    }).sort({ createdAt: -1 }).lean()

    res.status(200).json(reviews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Get Single Review API endpoint
handler.get(async (req, res) => {
  try {
    const { id } = req.query

    // Find the review by its ID
    const review = await Review.findById(id)

    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }

    res.status(200).json(review)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Update Review API endpoint
handler.put(async (req, res) => {
  try {
    const { id } = req.query
    const { rating, content, attachments } = req.body

    // Update the review by its ID
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, content, attachments },
      { new: true }
    )

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' })
    }

    res.status(200).json(updatedReview)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Delete Review API endpoint
handler.delete(async (req, res) => {
  try {
    const { id } = req.query

    // Delete the review by its ID
    const deletedReview = await Review.findByIdAndDelete(id)

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' })
    }

    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
