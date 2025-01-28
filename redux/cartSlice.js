// cartSlice.js

import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [], // Array to store cart items
    buyNow: Cookies.get('buyNow') ? JSON.parse(Cookies.get('buyNow')) : [], // Array to store cart items
    coupon: Cookies.get('coupon') ? JSON.parse(Cookies.get('coupon')) : null // Array to store cart items
  },

  reducers: {
    addItem: (state, action) => {
      let { product, quantity, size, image } = action.payload;

      const existingItemIndex = state.items.findIndex(
        item => item.image.uid === image.uid
      );

      if (existingItemIndex !== -1) {
        // Update the existing item
        const existingItem = state.items[existingItemIndex];
        state.items[existingItemIndex] = {
          ...existingItem,
          quantity: quantity,
          size: size,
        };
      } else {
        // Add the new item
        const { metaTitle, description, metaDescription, images, thumbnail, categories, thumbnailColors, attributes, placeholder, featured, sizes, color, colors, updatedAt, createdAt, sold, ...productWithoutDetails } = product;
        state.items.push({ product: productWithoutDetails, size, image, quantity });
      }

      try {
        Cookies.set('cartItems', JSON.stringify(state.items), { expires: 7 });
        console.log('Cart saved successfully.');
      } catch (error) {
        console.error('Error saving cart to cookies:', error);
      }
    },

    removeItem: (state, action) => {
      const { product, quantity, size, image } = action.payload
      state.items = state.items.filter(item => item.image.uid != image.uid)
      // Update cart data in cookies
      Cookies.set('cartItems', JSON.stringify(state.items), { expires: 7 })
    },
    clearCart: state => {
      state.items = [] // Clear cart items array
      // Clear cart data in cookies
      Cookies.remove('cartItems')
    },
    addToBuyNow: (state, action) => {
      state.buyNow = [action.payload]
      Cookies.set('buyNow', JSON.stringify(state.buyNow), { expires: 7 })
    },

    setCoupon: (state, action) => {
      state.coupon = action.payload

      // Calculate the expiration date 10 minutes from now
      const expires = new Date()
      expires.setMinutes(expires.getMinutes() + 10)

      Cookies.set('coupon', JSON.stringify(state.coupon), {
        expires: expires
      })
    },
    clearCoupon: (state, action) => {
      state.coupon = null
      Cookies.remove('coupon')
    }
  }
})

export const {
  addItem,
  removeItem,
  clearCart,
  addToBuyNow,
  setCoupon,
  clearCoupon
} = cartSlice.actions
export default cartSlice.reducer
