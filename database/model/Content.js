import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    title: {
      type: String
    },
    buttonText: {
      type: String
    },
    buttonHref: {
      type: String
    },

    isShown: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// Create Model
const Content =
  mongoose.models.Content || mongoose.model('Content', contentSchema)
export default Content
