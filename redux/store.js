import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice'
import state from './stateSlice'
import cart from './cartSlice'
import address from './addressSlice'
import product from './productSlice'
export const store = configureStore({
  reducer: {
    user,
    state,
    cart,
    address,
    product
  }
})
