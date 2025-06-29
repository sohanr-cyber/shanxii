import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: null,
        duplicateProduct: null,
        fetchAgain: false
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setDuplicateProduct: (state, action) => {
            state.product = action.payload
        },


    }
})

export const { setProduct, setDuplicateProduct } = productSlice.actions

export default productSlice.reducer
