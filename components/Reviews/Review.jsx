import React from 'react'
import styles from '../../styles/Reviews/Review.module.css'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import { getTime } from '@/utility/helper'

const Review = ({ review }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.image__container}>
                    <b>
                        {review.name && review.name.charAt(0)}
                    </b>

                </div>
                <b className={styles.name}>
                    {review.name && review.name.length > 20 ? review.name.substr(0, 10) : review.name}
                </b>
            </div>
            <div className={styles.right}>
                <Stack spacing={1}>
                    <Rating
                        name='half-rating-read'
                        defaultValue={review.rating}
                        precision={0.5}
                        readOnly
                        size='small'
                    />
                </Stack>
                <div className={styles.text}>{review.content}</div>
                <div className={styles.time}>{(review.createdAt.split("T")[0])}</div>
            </div>
        </div>
    )
}

export default Review