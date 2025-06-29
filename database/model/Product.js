import { generateUniqueID } from '@/utility/helper'
import { ExtractColors } from '@/utility/image';
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
    specification: {
      type: String
    },
    featured: {
      type: Boolean,
      default: false
    },
    ratings: { type: Number },
    totalRatings: { type: Number },
    ratingCount: { type: Number },
    purchasePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
    },
    priceWithDiscount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: false, // optional


    },
    // Media and content
    images: [
      {
        image: {
          type: String
        },
        colors: {
          type: Array,
          default: ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"]
        },
        uid: {
          type: String,
        },
        color: {
          type: String
        }
      }
    ],
    thumbnail: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      required: true,
      default: "normal",
      enum: ["normal", 'variable']
    },
    variants: [
      {
        color: {
          type: String
        },
        size: {
          type: String,
        },
        uid: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 0,

        },
        sold: {
          type: Number,
          default: 0,
        },
        purchasePrice: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        priceWithDiscount: {
          type: Number,
          required: true
        },
        image: {
          type: String,
        },
      }
    ]
    ,
    thumbnailColors: {
      type: Array,
      default: ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"]
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
    video: {
      type: String,

    }
  },
  { timestamps: true }
)






// Create Model
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
