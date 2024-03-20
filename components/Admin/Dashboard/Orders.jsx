import React from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
const Orders = () => {
  const orders = null
  return (
    <div className={styles.wrapper}>
      <h2>Latest Orders</h2>
      <div className={styles.table__wrapper}>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Action</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 2, 2, 2, 2, 2, 2, 2, 2]?.map((order, index) => (
              <tr key={index}>
                <td>{'order.id'}</td>
                <td>{'order.customerName'}</td>
                <td>{'rder.orderDate'}</td>
                <td>${500}</td>
                <td>{'rder.orderDate'}</td>
                <td>${500}</td>
                <td>
                  <>Delete</>
                  <>View</>
                </td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pages totalPages={10} currentPage={2} />
      </div>
    </div>
  )
}

export default Orders
