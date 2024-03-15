import React from 'react'
import styles from '../styles/Product.module.css'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Image from 'next/image'

const Product = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pic}>
        <Image
          src='https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=600'
          width={250}
          height={250}
          alt=''
        />
      </div>
      <div className={styles.details}>
        <div className={styles.category}>Men Shirt</div>
        <div className={styles.title}>Floral Blue 001 LS</div>
        <Stack spacing={1}>
          <Rating
            name='half-rating-read'
            defaultValue={2.5}
            precision={0.5}
            readOnly
            size='small'
          />
        </Stack>
        <div className={styles.price}>৳850.00</div>
      </div>
    </div>
  )
}

export default Product
