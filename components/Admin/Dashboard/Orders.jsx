import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'

const Orders = ({ title, dashboard, orders, totalPages }) => {
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [query, setSearchQuery] = useState('')
  const router = useRouter()
  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])
  // Function to handle search query change
  const handleSearchChange = e => {
    const query = e.target.value
    setSearchQuery(query)

    // Filter products based on the search query
    const filtered = orders.filter(
      order =>
        order._id.toLowerCase().includes(query.toLowerCase()) ||
        order.shippingAddress.phone
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        order.shippingAddress.fullName
          .toLowerCase()
          .includes(query.toLowerCase())
    )
    setFilteredOrders(filtered)
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
                placeholder=''
                onChange={e => handleSearchChange(e)}
              />
              <span>
                <SearchIcon />
              </span>
            </div>
            <div
              className={styles.right}
              style={{ display: 'flex', gap: '10px' }}
            >
              <select>
                {[
                  // 'Select Order Status',
                  'All',
                  'Pending',
                  'Confirmed',
                  'Delivere'
                ].map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
              <button onClick={() => router.push('/admin/product/create')}>
                Add Order
              </button>
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
                    <span>Delete</span>
                    <span onClick={() => router.push(`/order/${order._id}`)}>
                      {' '}
                      View
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
            <Pages totalPages={totalPages} currentPage={2} />
          </div>
        )}
      </div>
    </>
  )
}

export default Orders
