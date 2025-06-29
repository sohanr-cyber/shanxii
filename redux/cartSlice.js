// cartSlice.js

import { Satellite } from '@mui/icons-material';
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
      const { product, quantity, variant } = action.payload;

      // Helper to remove unnecessary product fields
      const stripProductDetails = (product) => {
        const {
          metaTitle, description, metaDescription, images, categories,
          thumbnailColors, attributes, placeholder, featured, sizes, color,
          colors, updatedAt, createdAt, sold, variants,
          ...productWithoutDetails
        } = product;
        return productWithoutDetails;
      };

      // Find existing item index
      let existingItemIndex = -1;

      if (product.productType == "variable") {
        console.log({ variant })
        existingItemIndex = state.items.findIndex(
          item =>
            item.product.productType == "variable" &&
            item.variant?.uid == variant?.uid
        );
      } else {
        existingItemIndex = state.items.findIndex(
          item =>
            item.product._id == product._id &&
            item.product.productType != "variable"
        );
      }

      if (existingItemIndex !== -1) {
        // If the item exists, increment quantity
        const existingItem = state.items[existingItemIndex];
        state.items[existingItemIndex] = {
          ...existingItem,
          quantity: quantity
        };
      } else {
        // If it’s a new item, add it to the cart
        const cleanedProduct = stripProductDetails(product);
        const newItem = product.productType === "variable"
          ? { product: cleanedProduct, variant, quantity }
          : { product: cleanedProduct, quantity };

        state.items.push(newItem);
      }

      // Save to cookies (don’t reverse unnecessarily)
      try {
        Cookies.set('cartItems', JSON.stringify(state.items), { expires: 7 });
        console.log('Cart saved successfully.');
      } catch (error) {
        console.error('Error saving cart to cookies:', error);
      }
    },


    removeItem: (state, action) => {
      let { product, variant } = action.payload;
      if (product.productType == "normal" || !product.productType) {
        state.items = state.items.filter(item => item.product._id != product._id)
        Cookies.set('cartItems', JSON.stringify(state.items), { expires: 7 })
      } else {
        state.items = state.items.filter(item => item.variant?.uid != variant.uid)
        Cookies.set('cartItems', JSON.stringify(state.items), { expires: 7 })

      }


      // Update cart data in cookies
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
