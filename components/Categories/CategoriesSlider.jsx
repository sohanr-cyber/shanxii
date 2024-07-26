import React, { useState } from 'react'
import SkeletonDiv from '../Utility/SkeletonDiv'
import { useSelector } from 'react-redux'
import styles from '../../styles/Category/CategoriesSlider.module.css'
import Logo from '../Utility/Logo'
import { useRouter } from 'next/router'

const CategoriesSlider = ({ setOpen }) => {
  const categories = useSelector(state => state.product.categories)
  const [expand, setExpand] = useState('')
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        {' '}
        <Logo />
        <div className={styles.close__btn} onClick={() => setOpen(false)}>
          X
        </div>
      </div>
      <div className={styles.categories}>
        {categories
          ? categories.map((i, index) => (
              <>
                {' '}
                <div className={styles.category} key={index}>
                  <div onClick={() => router.push(`/shop?categories=${i._id}`)}>
                    {i.name}
                  </div>
                  {i.children.length > 0 && (
                    <div
                      className={styles.plus}
                      onClick={() => setExpand(expand == i._id ? '' : i._id)}
                    >
                      {i._id == expand ? '-' : '+'}
                    </div>
                  )}
                </div>
                {i.children.length > 0 &&
                  expand == i._id &&
                  i.children.map((i, index) => (
                    <div
                      className={`${styles.category} ${styles.childCategory}`}
                      key={index}
                    >
                      <div
                        onClick={() => router.push(`/shop?categories=${i._id}`)}
                      >
                        {i.name}
                      </div>
                      {/* <div className={styles.plus}>+</div> */}
                    </div>
                  ))}
              </>
            ))
          : [1, 2, 3, 4, 5].map((i, index) => (
              <div className={styles.category} key={index}>
                <SkeletonDiv key={index} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default CategoriesSlider
