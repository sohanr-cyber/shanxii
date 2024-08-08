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
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPixel } = pixelSlice.actions
export default pixelSlice.reducer
