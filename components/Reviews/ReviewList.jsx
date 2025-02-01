import React, { useState } from 'react'
import styles from '../../styles/Reviews/ReviewList.module.css'
import Review from './Review'
import CustomerRatings from './CustomerRatings'
import AddReview from './AddReview'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

const ReviewList = ({ product, reviews }) => {
    const [writeReview, setWriteReview] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.flex}>
                <CustomerRatings reviews={reviews} />
                <div className={styles.write__review}>
                    <h2>Review this Product</h2>
                    <div className={styles.share}>Share your thoughts with other customers</div>
                    <Stack spacing={1} onClick={() => setWriteReview(true)} >
                        <Rating size="large"
                            name="simple-controlled"
                            value={0}
                        />
                    </Stack>
                    <div className={styles.btn} onClick={() => setWriteReview(true)}>Write a  review</div>
                </div>
            </div>

            {writeReview && <AddReview setWriteReview={setWriteReview} product={product} />}
            <>  {reviews.length > 0 ?.map((r, indx) => (
                <Review review={r} key={indx} />
            ))}</>
        </div>
    )
}

export default ReviewList