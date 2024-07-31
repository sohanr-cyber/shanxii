import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },

    image: {
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
