import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Upload from '@/components/Utility/Upload'
import axios from 'axios'
import BASE_URL from '@/config'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { showSnackBar } from '@/redux/notistackSlice'
import { buttonC, themeBg } from '@/utility/const'
// Content Craetion Form
const Create = ({ content: data }) => {
  const [content, setContent] = useState(data)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const [newContent, setNewContent] = useState(false)
  const categories = useSelector(state => state.product.categories)
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: 'Bearer ' + userInfo?.token }

  useEffect(() => {
    setContent(data)
  }, [router.query])

  const saveContent = async () => {
    if (!content.image) {
      dispatch(
        showSnackBar({
          message: 'Please Upload an Image',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post(
        '/api/content',
        {
          ...content
        },
        {
          headers
        }
      )
      if (data.error) {
        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'error'
            }
          })
        )
        dispatch(finishLoading())
        return
      }
      setContent({
        title: '',
        image: '',
        isShown: false,
        buttonText: '',
        buttonHref: ''
      })
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'New Content Created ',
          option: {
            variant: 'success'
          }
        })
      )
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Creating Content !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }

  console.log({ categories })
  const updateContent = async () => {
    if (!content.image) {
      setError('Please Upload an Image')
      dispatch(
        showSnackBar({
          message: 'Please Upload an Image',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/content/${router.query.id}`,
        {
          ...content
        },
        {
          headers
        }
      )
      setContent(data)
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Content Updated',
          option: {
            variant: 'default'
          }
        })
      )
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Updating Content !',
          option: {
            variant: 'error'
          }
        })
      )
      setError('Error While Updating Content !')
    }
  }
  return (
    <div className={styles.wrapper}>
      <h2>{router.query.id ? 'Update' : 'Add'} Content</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Content Name</label>
            <input
              type='text'
              placeholder='Enter Content Title'
              value={content.title}
              onChange={e => setContent({ ...content, title: e.target.value })}
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.field}>
              <label>CTA Text</label>
              <input
                type='text'
                placeholder='Enter CTA Text'
                value={content.buttonText}
                onChange={e =>
                  setContent({ ...content, buttonText: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>CTA Link</label>
              <input
                type='text'
                placeholder='Enter CTA LInk'
                value={content.buttonHref}
                onChange={e =>
                  setContent({ ...content, buttonHref: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Content Icon</label>
            <Upload
              handle={files => {
                setContent(prev => ({ ...prev, image: files.url }))
              }}
            />
          </div>

          <div className={styles.images}>
            {content.image ? (
              <div className={styles.image__container}>
                <Image src={content.image} alt='' width='180' height={180} />
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
                setContent({ ...content, isShown: !content.isFeatured })
              }
            >
              {content.isShown ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </span>
            <span> This Content will be shown in home page</span>{' '}
          </div>
          <div
            className={styles.field}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          ></div>
        </div>
        {/* <div className={styles.right}></div> */}
      </form>
      {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
      <button
        onClick={() => (router.query.id ? updateContent() : saveContent())}
      >
        Save Content
      </button>
    </div>
  )
}

export default Create

export async function getServerSideProps ({ query }) {
  const { id } = query

  const fetchContent = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/content/${id}`)
    return data
  }

  const fetchCategories = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/content`)
    return data.categories
  }

  // const categories = await fetchCategories()

  if (id) {
    const content = await fetchContent()
    return {
      props: {
        content
        // categories
      }
    }
  }

  return {
    props: {
      content: {
        title: '',
        image: '',
        children: []
      }
      // categories: categories
    }
  }
}
