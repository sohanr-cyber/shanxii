import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  slug: {
    // URL friendly identifier
    type: String,
    required: true,
    trim: true,
    unique: true // Ensures unique category URLs
  },

  // Optional fields for hierarchical categories
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference to itself for parent category
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category' // Reference to itself for child categories
    }
  ]
},
{ timestamps: true })

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)
export default Category
