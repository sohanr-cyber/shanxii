import { generateUniqueID } from '@/utility/helper'
import mongoose from 'mongoose'

// Define Schema
const productSchema = new mongoose.Schema(
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
    featured: {
      type: Boolean,
      default: false
    },
    sizes: { type: String },
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
    priceWithDiscount: {
      type: Number,
      required: true
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
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
      type: String,
      required: true
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
          type: String
        },
        value: {
          type: String
        },
        uid: {
          type: String,
        }
      }
    ],

    stockQuantity: {
      type: Number,
      default: 0,
      required: true
    },
    sold: {
      type: Number,
      default: 0,
      required: true
    },
    imageColors: {
      type: Array,
      default: ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"]
    }
  },
  { timestamps: true }
)

// Create Model
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
