import React, { useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Upload from '@/components/Utility/Upload'
import axios from 'axios'
import BASE_URL from '@/config'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
// Order Craetion Form
const Create = ({ category: data }) => {
  const [category, setCategory] = useState(data)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const saveCategory = async () => {
    setError('')
    if (!category.name) {
      setError('Pleas fill all the necessaary field')
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post('/api/category', category)
      setCategory({
        name: '',
        image: ''
      })
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError(error.response.data.message)
    }
  }

  const updateCategory = async () => {
    setError('')
    if (!category.name) {
      setError('Pleas fill all the necessaary field')
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(`/api/category/${router.query.id}`, {
        ...category
      })
      setCategory(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError(error.response.data.message)
    }
  }
  return (
    <div className={styles.wrapper}>
      <h2>Add Category</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Category Name</label>
            <input
              type='text'
              placeholder='Enter Category Name'
              value={category.name}
              onChange={e => setCategory({ ...category, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Category Icon</label>
            <Upload
              handle={files => {
                setCategory(prev => ({ ...prev, image: files.url }))
              }}
            />
          </div>
          <div className={styles.images}>
            {category.image ? (
              <div className={styles.image__container}>
                <Image src={category.image} alt='' width='180' height={180} />
              </div>
            ) : (
              <div
                className={styles.image__container}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                No Photo Uploaded
              </div>
            )}
          </div>
          <div
            className={styles.field}
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <span
              onClick={() =>
                setCategory({ ...category, isFeatured: !category.isFeatured })
              }
            >
              {category.isFeatured ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </span>
            <span> This Category will be shown in home page</span>{' '}
          </div>
          <div
            className={styles.field}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
            <span
              onClick={() =>
                setCategory({ ...category, isShown: !category.isShown })
              }
            >
              {category.isShown ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
            </span>
            <span> This category name is hidden in product details page</span>{' '}
          </div>
        </div>
        {/* <div className={styles.right}></div> */}
      </form>
      {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
      <button
        onClick={() => (router.query.id ? updateCategory() : saveCategory())}
      >
        Save Category
      </button>
    </div>
  )
}

export default Create

export async function getServerSideProps ({ query }) {
  const { id } = query

  const fetchCategory = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/category/${id}`)
    return data
  }

  if (id) {
    const category = await fetchCategory()

    return {
      props: {
        category
      }
    }
  }

  return {
    props: {
      category: {
        name: '',
        image: ''
      }
    }
  }
}
