import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema(
  {
    // User or entity associated with the address
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference path for polymorphic relationship
    },
    type: {
      type: String,
      required: true,
      enum: ['Home', 'Office']
    },
    // Address details
    fullName: {
      type: String,
      required: true
    },
    // Address details
    email: {
      type: String,
    },
    phone: {
      type: String
    },

    city: {
      type: String
    },
    state: {
      type: String
    },
    postalCode: {
      type: String
    },
    address: {
      type: String,
      required: true
    },

    position: {
      type: String
    },
    // Optional fields
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Address =
  mongoose.models.Address || mongoose.model('Address', addressSchema)
export default Address
