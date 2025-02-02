import React from 'react'
import PBar from '../Utility/PBar'
import styles from '../../styles/Reviews/CustomerRatings.module.css'

import { calculateAverageRating, generateUniqueID } from '@/utility/helper'
import Ratings from '../Utility/Rating'

const CustomerRatings = ({ reviews }) => {


    const getRatingPercentage = (reviews, targetRating) => {
        if (reviews.length === 0) return 0;

        const count = reviews.filter(review => review.rating === targetRating).length;
        return (count / reviews.length) * 100;
    };
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}> Customer Reviews</h2>
            <div className={styles.flex}>

                <Ratings ratings={parseFloat(calculateAverageRating(reviews).toFixed(1))} id={generateUniqueID([])} />
                <div className={styles.count}>
                    {(calculateAverageRating(reviews)).toFixed(1)} out of 5
                </div>
            </div>
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].reverse().map((i, indx) => (
                    <div className={styles.star}>
                        <div className={styles.label}>
                            {i} Star
                        </div>
                        <div className={styles.pbar}>
                            <PBar height={"6px"} percentage={getRatingPercentage(reviews, i) + 0.1} />
                        </div>
                        <div className={styles.percentage}>
                            {parseInt(getRatingPercentage(reviews, i))}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerRatings