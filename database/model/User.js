import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    // User credentials
    email: {
      type: String,
      required: true,
      unique: true // Ensures unique email addresses
    },
    password: {
      type: String,
      required: true,
      minlength: 6 // Minimum password length for security
    },
    // User details
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    // Optional fields
    phoneNumber: {
      type: String
    },
    // Address information (optional - consider referencing an Address model)
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address' // Reference to a separate Address model (optional)
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address' // Reference to a separate Address model (optional)
    },
    // User roles (optional)
    role: {
      type: String,
      enum: ['user', 'admin'], // Define allowed roles (can be extended)
      default: 'user'
    },
    // Additional information (optional)
    wishlist: [
      {
        // Array of product IDs for user's wishlist
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
