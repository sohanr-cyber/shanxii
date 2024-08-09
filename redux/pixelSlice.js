import { calculateSubtotal, getPrice } from '@/utility/helper'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const pixelSlice = createSlice({
  name: 'state',
  initialState: {
    pixel: null
  },

  reducers: {
    setPixel: (state, action) => {
      state.pixel = action.payload
    },
    handleViewProduct: (state, action) => {
      const product = action.payload
      const pixel = state.pixel
      pixel.track('ViewContent', {
        content_name: product.name,
        content_ids: [product._id],
        content_type: 'product',
        value: product.price,
        currency: 'BDT'
      })
    },

    handleAddItemToCart: (state, action) => {
      const product = action.payload
      const pixel = state.pixel
      pixel.track('AddToCart', {
        content_name: product.name,
        content_ids: [product._id],
        content_type: 'product',
        value: product.price,
        currency: 'BDT'
      })
    },

    handleInitiateCheckout: (state, action) => {
      const cartItems = action.payload
      const pixel = state.pixel
      pixel.track('InitiateCheckout', {
        content_ids: cartItems.map(item => item.product._id),
        content_type: 'product',
        value: calculateSubtotal(cartItems),
        currency: 'BDT'
      })
    },
    handlePurchase: (state, action) => {
      const order = action.payload
      const pixel = state.pixel
      pixel.track('Purchase', {
        content_type: 'product',
        value: order.total,
        currency: 'BDT',
        num_items: order.items.length,
        order_id: order._id
      })
    },

    handleAddPaymentInfo: (state, action) => {
      const { address, cartItems } = action.payload
      const pixel = state.pixel
      pixel.track('AddPaymentInfo', {
        content_ids: cartItems.map(item => item.product._id),
        content_type: 'product',
        value: calculateSubtotal(cartItems), // You can set this to the total value of the cart if needed
        currency: 'BDT',
        address: address // Custom parameter to include the address
      })
    },
    handleSearch: (state, action) => {
      const searchTerm = action.payload
      const pixel = state.pixel
      pixel.track('Search', {
        search_string: searchTerm,
        content_category: 'product' //
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setPixel,
  handleViewProduct,
  handleInitiateCheckout,
  handleAddItemToCart,
  handlePurchase,
  handleAddPaymentInfo,
  handleSearch
} = pixelSlice.actions

export default pixelSlice.reducer
