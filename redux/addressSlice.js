import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressInfo: Cookies.get('address')
      ? JSON.parse(Cookies.get('address'))
      : {} // Object to store address information
  },
  reducers: {
    setAddress: (state, action) => {
      state.addressInfo = action.payload // Set address information
      // Update address data in cookies
      Cookies.set('address', JSON.stringify(state.addressInfo), { expires: 7 })
    },
    clearAddress: state => {
      state.addressInfo = null // Clear address information
      // Clear address data in cookies
      Cookies.remove('address')
    }
  }
})

export const { setAddress, clearAddress } = addressSlice.actions

export default addressSlice.reducer
