import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice'
import state from './stateSlice'
import cart from './cartSlice'
import address from './addressSlice'
import category from './categorySlice'
import notistack from './notistackSlice'
import pixel from './pixelSlice'
import review from './reviewSlice'
import product from './productSlice'
import chat from './chatSlice'


export const store = configureStore({
  reducer: {
    user,
    state,
    cart,
    address,
    product,
    notistack,
    pixel,
    review,
    category,
    chat,
  }
})
