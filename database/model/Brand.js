import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // unique: true
    },

    slug: {
      // URL friendly identifier
      type: String,
    //   required: true,
      trim: true,
      // unique: true // Ensures unique Brand URLs
    },

    image: {
      type: String
    },
    // Optional fields for hierarchical categories
  
  },
  { timestamps: true }
)

// Create Model
const Brand =
  mongoose.models.Brand || mongoose.model('Brand', BrandSchema)
export default Brand
