import Catergory from '@/pages/shop/[category]'
import React, { useState } from 'react'
import styles from '../../styles/CategoryList.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BlurCircularIcon from '@mui/icons-material/BlurCircular'
const data = [
  {
    name: 'Electronics',
    parentCategory: null,
    isSubcategory: false,
    subcategories: [
      {
        name: 'Mobile Phones',
        isSubcategory: true
      },
      {
        name: 'Laptops',
        isSubcategory: true
      }
    ]
  },
  {
    name: 'Clothing',
    parentCategory: null,
    isSubcategory: false,
    subcategories: [
      {
        name: 'T-shirts',
        isSubcategory: true
      },
      {
        name: 'Pants',
        isSubcategory: true
      }
    ]
  }
]

const RenderSubcategories = ({ subcategories }) => {
  return (
    <ul className={styles.child__wrapper}>
      {subcategories.map(subcategory => (
        <li key={subcategory.name} className={styles.child__item}>
          <BlurCircularIcon style={{ fontSize: '50%' }} />
          {subcategory.name}
        </li>
      ))}
    </ul>
  )
}
const CategoryList = () => {
  const [categories, setCategories] = useState([...data, ...data, ...data])
  const [open, setOpen] = useState(data[0].name)
  return (
    <ul className={styles.wrapper}>
      {categories.map(category => (
        <li key={category.name} className={styles.item}>
          <>
            <span>
              {' '}
              {category.name}
              {category.subcategories.length > 0 && (
                <KeyboardArrowDownIcon
                  onClick={() =>
                    setOpen(open == category.name ? false : category.name)
                  }
                />
              )}
            </span>
            {category.subcategories.length > 0 && open == category.name && (
              <RenderSubcategories subcategories={category.subcategories} />
            )}
          </>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
