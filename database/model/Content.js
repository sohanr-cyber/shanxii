import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    title: {
      type: String
    },
    description: { type: String },
    buttonText: {
      type: String
    },
    buttonHref: {
      type: String
    },

    isShown: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "header",
      enum: ["header", "cta", "deal", "subscription"]
    }
  },
  { timestamps: true }
)

// Create Model
const Content =
  mongoose.models.Content || mongoose.model('Content', contentSchema)
export default Content
