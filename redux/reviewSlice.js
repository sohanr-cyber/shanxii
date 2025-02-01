import { createSlice } from '@reduxjs/toolkit'

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        fetchReviewAgain: false
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload
        },
        setFetchReviewAgain: (state, action) => {
            state.fetchReviewAgain = !state.fetchReviewAgain
        }
    }
})

export const { setReviews, setFetchReviewAgain } = reviewSlice.actions

export default reviewSlice.reducer
