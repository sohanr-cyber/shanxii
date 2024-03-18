import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema(
  {
    // User or entity associated with the address
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'User' // Reference path for polymorphic relationship
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
    phoneNumber: {
      type: String
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
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
