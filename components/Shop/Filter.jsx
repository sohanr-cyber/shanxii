import React, { useState } from 'react'
import styles from '../../styles/Shop/Filter.module.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import SkeletonDiv from '../Utility/SkeletonDiv'
import Colors from './Colors'
import Categories from './Categories'
import Ratings from '../Utility/Rating'

const Filter = ({ setOpen }) => {
  const router = useRouter()
  const categories = useSelector(state => state.category.categories)
  const [price, setPrice] = useState({
    minPrice: router.query.minPrice,
    maxPrice: router.query.maxPrice
  })

  const updateRoute = data => {
    const queryParams = { ...router.query, page: 1, ...data }
    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })
    setOpen(false)
  }

  const setColor = color => [
    router.query.colors?.split(',').find(i => i == color)
      ? updateRoute({
        colors: router.query.colors
          .split(',')
          .filter(i => i != color)
          .join(',')
      })
      : updateRoute({
        colors: router.query.colors
          ? [...router.query.colors.split(','), color].join(',')
          : [color].join(',')
      })
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.flex}>
          <h3>FILTER</h3>
          <h3 onClick={() => setOpen(false)}>X</h3>
        </div>
        {/* price filter */}
        <div className={styles.heading}>Price</div>
        <div className={styles.filterOptions}>
          <div className={styles.fields}>
            <input
              type='number'
              placeholder='Min'
              value={price.minPrice}
              onChange={e => setPrice({ ...price, minPrice: e.target.value })}
            />
            <input
              type='number'
              placeholder='Max'
              value={price.maxPrice}
              onChange={e => setPrice({ ...price, maxPrice: e.target.value })}
            />
          </div>
          <button onClick={() => updateRoute(price)}>Apply</button>
        </div>
        <div className={styles.heading}>Rating</div>
        <div className={styles.filterOptions} >
          {[5, 4, 3, 2, 1].map((r, i) => (
            <div className={styles.rating} style={{ margin: "5px 0" }} onClick={() => updateRoute({ rating: r })}>
              <Ratings ratings={r} size={"large"} gap={"10px"} />
            </div>))}
        </div>
        {/* Category Filter */}
        <div className={styles.heading}>Category</div>
        <div className={styles.filterOptions}>
          <Categories categories={categories} updateRoute={updateRoute} />
        </div>

        {/* Color Family */}
        <div className={styles.heading}>Color Family</div>
        <div className={styles.filterOptions} style={{ marginBottom: "35px" }}>
          <Colors selectedColors={router.query.colors} handleClick={setColor} />
        </div>
      </div>
      <div className={styles.right} onClick={() => setOpen(false)}></div>
    </div>
  )
}

export default Filter
