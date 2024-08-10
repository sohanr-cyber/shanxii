import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showSnackBar } from '@/redux/notistackSlice'
import MailBox from '@/components/Utility/MailBox'

const Orders = ({ title, dashboard, orders, totalPages, currentPage }) => {
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(router.query.query)
  const dispatch = useDispatch()
  const [recipents, setRecipents] = useState([orders[0].shippingAddress])

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

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
      const { data } = await axios.delete(`/api/order/${id}`)
      setFilteredOrders(filteredOrders.filter(i => i._id != id))
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
      {recipents && <MailBox recipents={recipents} close={setRecipents} />}
      {!dashboard && <h2>{title}</h2>}

      <div className={styles.wrapper}>
        {' '}
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input
                type='text'
                placeholder=''
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
                  updateRoute({ status: e.target.value.toLowerCase() })
                }
              >
                {[
                  // 'Select Order Status',
                  'All',
                  'Pending',
                  'Confirmed',
                  'Delivered'
                ].map((item, index) => (
                  <option key={index}>{item}</option>
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
                <th>Order ID</th>
                <th style={{ minWidth: '200px' }}>Customer Name</th>
                <th>Customer Phone</th>
                <th>Total Amount</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Action</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {[...filteredOrders]?.map((order, index) => (
                <tr key={index}>
                  <td onClick={() => router.push(`/order/${order._id}`)}>
                    {order._id.split('').slice(0, 9)}...
                  </td>
                  <td>{order.shippingAddress.fullName}</td>
                  <td>{order.shippingAddress.phone}</td>
                  <td>৳{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentStatus}</td>
                  <td className={styles.action}>
                    <span onDoubleClick={() => remove(order._id)}>Delete</span>
                    <span onClick={() => router.push(`/order/${order._id}`)}>
                      {' '}
                      View
                    </span>

                    <span onClick={() => setRecipents([order.shippingAddress])}>
                      Mail
                    </span>
                  </td>
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

export default Orders
