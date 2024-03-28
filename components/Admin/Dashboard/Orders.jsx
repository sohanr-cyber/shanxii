import React from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'

const Orders = ({ title, dashboard, orders, totalPages }) => {
  return (
    <>
      {!dashboard && <h2>{title}</h2>}

      <div className={styles.wrapper}>
        {' '}
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input type='text' placeholder='' />
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
              {[...orders]?.map((order, index) => (
                <tr key={index}>
                  <td>{order._id.split('').slice(0, 9)}...</td>
                  <td>{order.shippingAddress.fullName}</td>
                  <td>{order.shippingAddress.phone}</td>
                  <td>৳{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentStatus}</td>
                  <td className={styles.action}>
                    <span>Delete</span>
                    <span>View</span>
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
