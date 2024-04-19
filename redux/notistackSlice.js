import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const notistackSlice = createSlice({
  name: 'notistack',
  initialState: {
    notistack: null
  },

  reducers: {
    showSnackBar: (state, action) => {
      state.notistack = action.payload
    },
    hideSnackBar: state => {
      state.notistack = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { showSnackBar, hideSnackBar } = notistackSlice.actions
export default notistackSlice.reducer
