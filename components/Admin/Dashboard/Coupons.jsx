import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'

const Coupons = ({ title, dashboard, currentPage, totalPages, coupons }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCoupons, setFilteredCoupons] = useState(coupons)
  useEffect(() => {
    setFilteredCoupons(coupons)
  }, [coupons])

  // Function to handle search query change
  const handleSearchChange = e => {
    const query = e.target.value
    setSearchQuery(query)

    // Filter products based on the search query
    const filtered = coupons.filter(
      c =>
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c._id.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCoupons(filtered)
  }

  const remove = async id => {
    try {
      dispatch(startLoading())
      const { data } = await axios.delete(`/api/coupon/${id}`)
      setFilteredCoupons(filteredCoupons.filter(i => i._id != id))
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <>
      {' '}
      {!dashboard && <h2>{title}</h2>}
      <div className={styles.wrapper} id='categories'>
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input
                type='text'
                placeholder=''
                onChange={e => handleSearchChange(e)}
              />
              <span>
                <SearchIcon />
              </span>
            </div>
            <div className={styles.right}>
              <button onClick={() => router.push('/admin/coupon/create')}>
                Add Coupon
              </button>
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          {' '}
          <table>
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Type</th>
                <th>Discount Value</th>
                <th>From</th>
                <th>To</th>
                {/* <th>CreatedAt</th> */}
                <th>Action</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {[...filteredCoupons]?.map((c, index) => (
                <tr key={index}>
                  <td>{c.code}</td>
                  <td>{c.discountType}</td>
                  <td>{c.discountValue && <> -{c.discountValue} %</>}</td>
                  <td>{c.startDate}</td>
                  <td>{c.expiryDate}</td>

                  <td className={styles.action}>
                    <span onClick={() => remove(c._id)}>Delete</span>
                    <span
                      onClick={() =>
                        router.push(`/admin/coupon/create?id=${c._id}`)
                      }
                    >
                      View
                    </span>
                  </td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>{' '}
        </div>
        {!dashboard && (
          <div className={styles.pagination}>
            <Pages totalPages={totalPages} currentPage={currentPage} />
          </div>
        )}
      </div>
    </>
  )
}

export default Coupons
