import React, { useState } from 'react'
import styles from '../../styles/Categories.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ListIcon from '@mui/icons-material/List'
import { useSelector } from 'react-redux'
import SkeletonDiv from '../Utility/SkeletonDiv'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Categories = () => {
  const [open, setOpen] = useState(false)
  const categories = useSelector(state => state.product.categories)
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.category__items}>
          <div className={styles.select__category}>
            Categories{' '}
            <span onClick={() => setOpen(prev => !prev)}>
              <KeyboardArrowDownIcon />
            </span>
          </div>
          {open && (
            <div className={styles.category__list}>
              {categories
                ? categories.map((item, index) => (
                    <div className={styles.category__item} key={index}>
                      {item.name}
                    </div>
                  ))
                : [1, 2, 3, 3, 4].map((item, index) => (
                    <div className={styles.category__item} key={index}>
                      <SkeletonDiv />
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div className={styles.items}>
          {categories
            ? categories.map((item, index) => (
                <div
                  className={styles.item}
                  key={index}
                  style={{
                    minWidth: `${item.name.length * 7.7}px`
                    // background: 'red'
                  }}
                  onClick={() => router.push(`/shop?categories=${item._id}`)}
                >
                  <Image src={item.image} width='25' height='25' alt='' />
                  {item.name}
                </div>
              ))
            : [1, 2, 3, 4, 5].map((item, index) => (
                <div className={styles.item} key={index}>
                  {<SkeletonDiv />}
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
