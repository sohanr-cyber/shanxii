import React from 'react'
import styles from '../styles/Product.module.css'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getPrice } from '@/utilty/helper'

const Product = ({ item, redirect }) => {
  const router = useRouter()
  return (
    <div
      className={styles.wrapper}
      onClick={() => redirect && router.push(`/product/${item.slug}`)}
    >
      <div className={styles.pic}>
        <Image src={item.thumbnail} width={250} height={250} alt='' />
      </div>
      <div className={styles.details}>
        <div className={styles.category}>
          {item.categories?.map(i => i.name)[0]}
        </div>
        <div className={styles.title}>{item.name}</div>
        <Stack spacing={1}>
          <Rating
            name='half-rating-read'
            defaultValue={item.ratings}
            precision={0.5}
            readOnly
            size='small'
          />
        </Stack>
        {item.discount ? (
          <div>
            <div className={styles.price}>
              ৳{getPrice(item.price, item.discount)}
            </div>
            <div className={styles.flex}>
              <div className={styles.price}>
                <s>৳{getPrice(item.price)}</s>
              </div>
              <div className={styles.discount}>{item.discount}%</div>
            </div>
          </div>
        ) : (
          <div className={styles.price}>৳{getPrice(item.price)}</div>
        )}
      </div>
    </div>
  )
}

export default Product
