import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    categories: null
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    }
  }
})

export const { setCategories } = productSlice.actions

export default productSlice.reducer
