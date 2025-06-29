import { generateUniqueID } from '@/utility/helper'
import { createSlice } from '@reduxjs/toolkit'
import { lastDayOfYear } from 'date-fns'

export const productSlice = createSlice({
    name: 'productCreate',
    initialState: {
        productData: {},
        variant: {},
        variantTable: [],
        variants: [],

    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setVariant: (state, action) => {
            state.variant = { ...state.variant, ...action.payload }
        },
        updateVariants: (state, action) => {
            const index = state.variants.findIndex(item => item.uid == action.payload.uid)
            if (index !== -1) {
                state.variants[index] = { ...state.variants[index], ...action.payload };
            }
        },
        setVariantTable: (state, action) => {
            state.variantTable = action.payload
        },
        setVariants: (state, action) => {
            state.variants = action.payload
        }
        ,

        addNewVariant: (state, action) => {
            console.log(state.variants)
            const newVariants = [...state.variants, action.payload]
            state.variants = newVariants
        },

        removeVariant: (state, action) => {
            state.variants = state.variants.filter(e => e.uid !== action.payload.uid);
        }



    }
})

export const { setProduct, setVariant, setVariants, addNewVariant, removeVariant, updateVariantTable, setVariantTable, updateVariants } = productSlice.actions

export default productSlice.reducer
