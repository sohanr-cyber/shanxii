import React, { useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Upload from '@/components/Utility/Upload'
import axios from 'axios'
import BASE_URL from '@/config'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { finishLoading, startLoading } from '@/redux/stateSlice'

// Order Craetion Form
const Create = ({ coupon: data }) => {
  const [coupon, setCoupon] = useState(data)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const savecoupon = async () => {
    setError('')
    if (
      !coupon.code ||
      !coupon.expiryDate ||
      !coupon.startDate ||
      !coupon.discountType
    ) {
      setError('Please fill all the necessaary field')
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post('/api/coupon', coupon)
      setCoupon({
        code: '',
        expiryDate: '',
        startDate: new Date(),
        discountType: '',
        discountValue: 0
      })
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError(error.response.data.message)
    }
  }

  const updatecoupon = async () => {
    setError('')
    if (
      !coupon.code ||
      !coupon.expiryDate ||
      !coupon.startDate ||
      !coupon.discountType
    ) {
      setError('Please fill all the necessaary field')
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(`/api/coupon/${router.query.id}`, {
        ...coupon
      })
      setCoupon(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError(error.response.data.message)
    }
  }
  return (
    <div className={styles.wrapper}>
      <h2>Add coupon</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Coupon Code</label>
            <input
              type='text'
              placeholder='Enter coupon Code'
              value={coupon.code}
              onChange={e => setCoupon({ ...coupon, code: e.target.value })}
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Start Date</label>
              <input
                type='date'
                placeholder='Enter coupon Name'
                value={
                  coupon.startDate
                    ? new Date(coupon.startDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={e =>
                  setCoupon({ ...coupon, startDate: new Date(e.target.value) })
                }
              />
            </div>
            <div className={styles.field}>
              <label>Expiry Date</label>
              <input
                type='date'
                placeholder='Enter coupon Name'
                value={
                  coupon.expiryDate
                    ? new Date(coupon.expiryDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={e =>
                  setCoupon({ ...coupon, expiryDate: new Date(e.target.value) })
                }
              />
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Discount Type</label>
              <div className={styles.options}>
                {['percentage', 'fixed_amount', 'free_shipping'].map(
                  (item, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        setCoupon({ ...coupon, discountType: item })
                      }
                      style={
                        item == coupon.discountType
                          ? { background: 'black', color: 'white' }
                          : {}
                      }
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            {coupon.discountType == 'percentage' && (
              <div className={styles.field}>
                <label>Discount</label>
                <input
                  type='number'
                  placeholder='Enter Discount'
                  value={coupon.discountValue}
                  onChange={e =>
                    setCoupon({ ...coupon, discountValue: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* <div className={styles.right}></div> */}
      </form>
      {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
      <button onClick={() => (router.query.id ? updatecoupon() : savecoupon())}>
        Save coupon
      </button>
    </div>
  )
}

export default Create

export async function getServerSideProps ({ query }) {
  const { id } = query

  const fetchcoupon = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/coupon/${id}`)
    return data
  }

  if (id) {
    const coupon = await fetchcoupon()

    return {
      props: {
        coupon
      }
    }
  }

  return {
    props: {
      coupon: {
        name: '',
        image: ''
      }
    }
  }
}
