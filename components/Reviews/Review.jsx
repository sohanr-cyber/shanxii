import React from 'react'
import styles from '../../styles/Reviews/Review.module.css'

import { getTime } from '@/utility/helper'
import Ratings from '../Utility/Rating'

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

                <Ratings ratings={review.rating} id={review._id} />
                <div className={styles.text}>{review.content}</div>
                <div className={styles.time}>{(review.createdAt.split("T")[0])}</div>
            </div>
        </div>
    )
}

export default Review