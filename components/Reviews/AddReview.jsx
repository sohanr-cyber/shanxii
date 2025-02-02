import React, { useState } from 'react'
import styles from '../../styles/Reviews/AddReview.module.css'
import ProductAsRow from '../Products/Product/ProductAsRow'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Upload from '../Utility/Upload'
import UploadMany from '../Utility/UploadMany'
import { Attachment } from '@mui/icons-material'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { setReviews } from '@/redux/reviewSlice'
import { validate } from 'email-validator'

const AddReview = ({ setWriteReview, product }) => {
    const [review, setReview] = useState({})
    const reviews = useSelector(state => state.review.reviews)

    const dispatch = useDispatch()
    const create = async () => {
        try {
            if (!review.rating || !review.name || !review.email || !validate(review.email)) {
                dispatch(showSnackBar({
                    message: "Fill All The Required Field !",
                    option: {
                        variant: "error"
                    }
                }))
                return
            }
            dispatch(startLoading())
            const { data } = await axios.post(`/api/review/${product}`, {
                ...review
            })
            dispatch(setReviews([data, ...reviews]))
            dispatch(finishLoading())
            setWriteReview(false)
        } catch (error) {
            dispatch(finishLoading())
            dispatch(showSnackBar({
                message: "Something Went Wrong !",
                option: {
                    variant: "error"
                }
            }))
            console.log(error)
        }

    }

    const handleImages = files => {
        setReview(prev => ({
            ...prev, attachments: files.map(i => (i))
        }))
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.form__container}>
                <div className={styles.top}>
                    <h2> Write A Review</h2>
                    <div className={styles.close} onClick={() => setWriteReview(false)}>
                        X
                    </div>
                </div>
                {/* <ProductAsRow /> */}
                <div className={styles.form}>
                    <div className={styles.field}>  <label>Please Rate This Product</label>
                        <Stack spacing={1} >
                            <Rating size="large"
                                name="simple-controlled"
                                value={review.rating || 0}
                                onChange={(event, newValue) => {
                                    setReview({ ...review, rating: newValue })
                                }}

                            />
                        </Stack></div>
                    <div className={styles.field}>
                        <label>Desribe Your Experiance(Optional)</label>
                        <textarea onChange={(e) => setReview({ ...review, content: e.target.value })} value={review.content}></textarea>
                    </div>
                    {/* <div className={styles.field}>
                        <label>Upload Photo(up to 5)(Optional)</label>
                        <UploadMany handle={files => handleImages(files)} />
                    </div> */}

                    <div className={styles.field}>
                        <label>Your Name</label>
                        <input type="text" onChange={(e) => setReview({ ...review, name: e.target.value })} value={review.name} />
                    </div>
                    <div className={styles.field}>
                        <label >Your Email</label>
                        <input type="email" onChange={(e) => setReview({ ...review, email: e.target.value })} value={review.email} />

                    </div>
                    <div className={styles.flex}>
                        <div className={styles.btn} onClick={() => create()}>Submit</div>
                        <div className={`${styles.btn} ${styles.cancel}`} onClick={() => setWriteReview(false)}>Cancel</div>

                    </div>
                </div></div>
        </div>
    )
}

export default AddReview