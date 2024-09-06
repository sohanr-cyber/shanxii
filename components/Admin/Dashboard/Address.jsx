import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showSnackBar } from '@/redux/notistackSlice'

const Addresses = ({
  title,
  dashboard,
  addresses,
  totalPages,
  currentPage
}) => {
  const [filteredAddresses, setFilteredAddresses] = useState(addresses)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(router.query.query)
  const dispatch = useDispatch()

  useEffect(() => {
    setFilteredAddresses(addresses)
  }, [addresses])

  const updateRoute = data => {
    const queryParams = { ...router.query, ...data, page: 1 }
    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })
  }

  const remove = async id => {
    try {
      dispatch(startLoading())
      const { data } = await axios.delete(`/api/address/${id}`)
      setFilteredAddresses(filteredAddresses.filter(i => i._id != id))
      if (data.message) {
        dispatch(
          showSnackBar({
            message: data.message
          })
        )
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }
  return (
    <>
      {!dashboard && <h2>{title}</h2>}

      <div className={styles.wrapper}>
        {' '}
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input
                type='text'
                placeholder='Search by name or phone '
                onChange={e => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <span onClick={() => updateRoute({ query: searchQuery })}>
                <SearchIcon />
              </span>
            </div>
            <div
              className={styles.right}
              style={{ display: 'flex', gap: '10px' }}
            >
              <select
                onChange={e =>
                  updateRoute({ position: e.target.value.toLowerCase() })
                }
                // value={router.query.position}
              >
                {[
                  // 'Select Address Status',
                  'All',
                  'Inside Dhaka',
                  'Outside Dhaka	',
                  'Dhaka Subburb'
                ].map((item, index) => (
                  <option
                    key={index}
                    selected={
                      item.toLocaleLowerCase() == router.query.position
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>
              {/* <button onClick={() => router.push('/admin/product/create')}>
                <span className={styles.plus__btn}>Add Product</span>
                <span className={styles.plus__icon}>+</span>
              </button> */}
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          <table>
            <thead>
              <tr>
                <th>Address ID</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Area</th>
                <th>Address</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {[...filteredAddresses]?.map((address, index) => (
                <tr key={index}>
                  <td>{address._id.split('').slice(0, 9)}...</td>
                  <td>{address.fullName}</td>
                  <td
                    onClick={() =>
                      router.push(`/admin/order?query=${address.phone}`)
                    }
                  >
                    {address.phone}
                  </td>
                  <td>{address.position}</td>
                  <td>{address.address}</td>
                  <td>{address.paymentStatus}</td>

                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!dashboard && (
          <div className={styles.pagination}>
            <Pages
              totalPages={totalPages}
              currentPage={router.query.page || currentPage}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Addresses
