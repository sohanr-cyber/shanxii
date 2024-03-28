import React from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'

const Categories = ({ title, dashboard }) => {
  const router = useRouter()
  return (
    <>
      {' '}
      {!dashboard && <h2>{title}</h2>}
      <div className={styles.wrapper} id='categories'>
        {dashboard && <h2>{title}</h2>}
        {!dashboard && (
          <div className={styles.flex}>
            <div className={styles.left}>
              <input type='text' placeholder='' />
              <span>
                <SearchIcon />
              </span>
            </div>
            <div className={styles.right}>
              <button onClick={() => router.push('/admin/category/create')}>
                Add Category
              </button>
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          {' '}
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Category Icon</th>
                <th>Total Sale</th>
                <th>CreatedAt</th>
                <th>Action</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 2, 2]?.map((order, index) => (
                <tr key={index}>
                  <td>{'order.id'}</td>
                  <td>{'order.customerName'}</td>
                  <td>{'rder.orderDate'}</td>
                  <td>${500}</td>

                  <td className={styles.action}>
                    <span>Delete</span>
                    <span>View</span>
                  </td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>{' '}
        </div>
        {!dashboard && (
          <div className={styles.pagination}>
            <Pages totalPages={10} currentPage={2} />
          </div>
        )}
      </div>
    </>
  )
}

export default Categories
