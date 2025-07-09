import { createSlice } from '@reduxjs/toolkit'

// Helpers for localStorage
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

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressInfo: getLocalStorage('address', {})
  },
  reducers: {
    setAddress: (state, action) => {
      state.addressInfo = action.payload
      setLocalStorage('address', state.addressInfo)
    },
    clearAddress: (state) => {
      state.addressInfo = null
      removeLocalStorage('address')
    }
  }
})

export const { setAddress, clearAddress } = addressSlice.actions

export default addressSlice.reducer
