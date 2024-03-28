import React from 'react'
import styles from '../../../styles/Admin/Reviews.module.css'
import Image from 'next/image'
import { Rating, Stack } from '@mui/material'

const Reviews = () => {
  return (
    <div className={styles.wrapper} id='reviews'>
      <h2>New Coomments</h2>
      <div className={styles.comments}>
        {[1, 2, 2, 3].map((item, index) => (
          <div className={styles.comment} key={index}>
            <div className={styles.avater}>
              <Image
                src='https://cdn-icons-png.flaticon.com/128/1999/1999625.png'
                width='30'
                height='30'
                alt=''
              />
            </div>
            <div className={styles.data}>
              <div className={styles.name}>Kathyr Mupryhn</div>
              <div className={styles.rating}>
                <Stack spacing={1}>
                  <Rating
                    name='half-rating-read'
                    defaultValue={2.5 + item}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                </Stack>
              </div>
              <div className={styles.text}>
                Lorem, ipsum dolor nihil reiciendis ipsum ex omnis? Cumque atque
                commodi officia ad iste, ducimus vitae.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
