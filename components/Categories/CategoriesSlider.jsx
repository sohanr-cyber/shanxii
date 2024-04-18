import React from 'react'
import SkeletonDiv from '../Utility/SkeletonDiv'
import { useSelector } from 'react-redux'
import styles from '../../styles/Category/CategoriesSlider.module.css'
import Logo from '../Utility/Logo'

const CategoriesSlider = ({ setOpen }) => {
  const categories = useSelector(state => state.product.categories)

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
              <div className={styles.category} key={index}>
                {i.name}
              </div>
            ))
          : [1, 2, 3,4,5].map((i, index) => (
              <div className={styles.category} key={index}>
                <SkeletonDiv key={index} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default CategoriesSlider
