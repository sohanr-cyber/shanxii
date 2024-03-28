// cartSlice.js

import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [] // Array to store cart items
  },
  reducers: {
    addItem: (state, action) => {
      const { product, quantity, size } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.product._id === product._id
      )
      if (existingItemIndex !== -1) {
        // Item already exists in cart, update its quantity
        state.items[existingItemIndex].quantity = quantity
        state.items[existingItemIndex].size = size
      } else {
        // Item not found in cart, add it
        state.items.push(action.payload)
      }
      Cookies.set('cart', JSON.stringify(state.items), { expires: 7 })
    },
    removeItem: (state, action) => {
      const { product, quantity, size } = action.payload
      state.items = state.items.filter(item => item.product._id != product._id)
      // Update cart data in cookies
      Cookies.set('cart', JSON.stringify(state.items), { expires: 7 })
    },
    clearCart: state => {
      state.items = [] // Clear cart items array
      // Clear cart data in cookies
      Cookies.remove('cart')
    }
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
