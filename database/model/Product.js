import mongoose from 'mongoose'

const { Schema, model } = mongoose

// Define Schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true, // Ensures unique product URLs
      trim: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      defautl: 0
    },
    categories: [
      {
        type: String,
        required: true
      }
    ],

    color: { type: String },
    // Media and content
    images: [
      {
        type: String,
        required: true
      }
    ],
    thumbnail: {
      type: String
    },

    // SEO and visibility
    metaTitle: {
      type: String
    },
    metaDescription: {
      type: String
    },

    // Additional attributes
    attributes: [
      {
        name: {
          type: String,
          required: true
        },
        value: {
          type: String
        }
      }
    ],

    stockQuantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

// Create Model
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
