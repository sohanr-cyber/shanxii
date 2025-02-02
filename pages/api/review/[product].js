// Import necessary modules and the Review model
import nc from 'next-connect'

import Product from '@/database/model/Product'
import Review from '@/database/model/Review'
import db from '@/database/connection'
import User from '@/database/model/User'
import { calculateAverageRating } from '@/utility/helper'

// Initialize next-connect handler
const handler = nc()

// Connect to the database
db.connect()

// Create Review API endpoint
handler.post(async (req, res) => {
  try {
    const { rating, content, attachments, name, email } = req.body;
    const { product } = req.query;

    // Check if required fields are present
    if (!rating || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Convert rating to a number and validate
    const parsedRating = Number(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ message: 'Invalid rating value' });
    }

    // Check if the product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create the review
    const review = await Review.create({
      name,
      email,
      product,
      rating: parsedRating,
      content,
      attachments,
    });

    // Update rating using a more optimized approach
    existingProduct.totalRatings = (existingProduct.totalRatings || 0) + parsedRating;
    existingProduct.ratingCount = (existingProduct.ratingCount || 0) + 1;
    existingProduct.ratings = existingProduct.totalRatings / existingProduct.ratingCount;

    await existingProduct.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Get All Reviews API endpoint
handler.get(async (req, res) => {
  try {
    const { product: productId } = req.query
    await db.connect()
    // Find all reviews associated with the specified product
    const reviews = await Review.find({ product: productId }).populate({
      path: "user",
      select: "_id firstName"
    }).sort({ createdAt: -1 }).lean()
    await db.disconnect()
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
    await db.connect()

    // Find the review by its ID
    const review = await Review.findById(id)
    await db.disconnect()

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
    await db.connect()

    // Update the review by its ID
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, content, attachments },
      { new: true }
    )
    await db.disconnect()

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
    await db.connect()

    // Delete the review by its ID
    const deletedReview = await Review.findByIdAndDelete(id)
    await db.disconnect()

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
