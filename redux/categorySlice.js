import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'category',
  initialState: {
    categories: null,
    fetchAgain: false
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setFetchAgain: (state, action) => {
      state.fetchAgain = !state.fetchAgain
    }
  }
})

export const { setCategories, setFetchAgain } = productSlice.actions

export default productSlice.reducer
