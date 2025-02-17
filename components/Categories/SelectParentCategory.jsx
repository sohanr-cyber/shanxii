import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '@/styles/Category/SelectCategory.module.css'
import CheckBox from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank'
import { useRouter } from 'next/router'
import { Category } from '@mui/icons-material'
import SelectCategory from './SelectCategory'

const SelectParentCategory = ({ category, setCategory }) => {
  const categories = useSelector(state => state.category.categories)
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const handleDoubleClick = (item) => {
    userInfo?.role == "admin" && router.push(`/admin/category/create?id=${item._id}`)
  }

  return (
    <div className={styles.wrapper}>
      {categories?.map((i, index) => (
        <>
          {' '}
          <div className={styles.item}>
            {category.parent == i._id ? (
              <CheckBox
                onClick={() => setCategory({ ...category, parent: null })}
              />
            ) : (
              <CheckBoxOutlineBlank
                onClick={() => setCategory({ ...category, parent: i._id })}
              />
            )}

            <div className={styles.name} onDoubleClick={() => handleDoubleClick(i)}>{i.name}</div>
          </div>
          {i.children.length > 0 &&
            i.children?.map((i, index) => (
              <>
                <div className={styles.item} style={{ marginLeft: '20px' }}>
                  {category.parent == i._id ? (
                    <CheckBox
                      onClick={() => setCategory({ ...category, parent: null })}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      onClick={() =>
                        setCategory({ ...category, parent: i._id })
                      }
                    />
                  )}

                  <div className={styles.name} onDoubleClick={() => handleDoubleClick(i)}>{i.name}</div>
                </div>
                {i.children.length > 0 &&
                  i.children?.map((i, index) => (
                    <div className={styles.item} style={{ marginLeft: '40px' }}>
                      {category.parent == i._id ? (
                        <CheckBox
                          onClick={() =>
                            setCategory({ ...category, parent: null })
                          }
                        />
                      ) : (
                        <CheckBoxOutlineBlank
                          onClick={() =>
                            setCategory({ ...category, parent: i._id })
                          }
                        />
                      )}

                      <div className={styles.name} onDoubleClick={() => handleDoubleClick(i)}>{i.name}</div>
                    </div>
                  ))}
              </>
            ))}
        </>
      ))}
    </div>
  )
}

export default SelectParentCategory
