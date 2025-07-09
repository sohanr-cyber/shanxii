import { createSlice } from '@reduxjs/toolkit'

const getLocalStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error)
    return fallback
  }
}

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error)
  }
}

const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getLocalStorage('cartItems', []),
    buyNow: getLocalStorage('buyNow', []),
    coupon: getLocalStorage('coupon', null),
  },

  reducers: {
    addItem: (state, action) => {
      const { product, quantity, variant } = action.payload

      const stripProductDetails = (product) => {
        const {
          metaTitle, description, metaDescription, images, categories,
          thumbnailColors, attributes, placeholder, featured, sizes, color,
          colors, updatedAt, createdAt, sold, variants,
          ...productWithoutDetails
        } = product
        return productWithoutDetails
      }

      let existingItemIndex = -1
      if (product.productType === "variable") {
        existingItemIndex = state.items.findIndex(
          item =>
            item.product.productType === "variable" &&
            item.variant?.uid === variant?.uid
        )
      } else {
        existingItemIndex = state.items.findIndex(
          item =>
            item.product._id === product._id &&
            item.product.productType !== "variable"
        )
      }

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity = quantity
      } else {
        const cleanedProduct = stripProductDetails(product)
        const newItem = product.productType === "variable"
          ? { product: cleanedProduct, variant, quantity }
          : { product: cleanedProduct, quantity }

        state.items.push(newItem)
      }

      setLocalStorage('cartItems', state.items)
    },

    removeItem: (state, action) => {
      const { product, variant } = action.payload

      if (product.productType === "normal" || !product.productType) {
        state.items = state.items.filter(item => item.product._id !== product._id)
      } else {
        state.items = state.items.filter(item => item.variant?.uid !== variant.uid)
      }

      setLocalStorage('cartItems', state.items)
    },

    clearCart: (state) => {
      state.items = []
      removeLocalStorage('cartItems')
    },

    addToBuyNow: (state, action) => {
      state.buyNow = [action.payload]
      setLocalStorage('buyNow', state.buyNow)
    },

    setCoupon: (state, action) => {
      state.coupon = action.payload

      // Optional: handle expiration manually using timestamp if needed
      setLocalStorage('coupon', state.coupon)
    },

    clearCoupon: (state) => {
      state.coupon = null
      removeLocalStorage('coupon')
    },
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
