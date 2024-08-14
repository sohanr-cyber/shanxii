import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/Orders.module.css'
import Pages from '@/components/Utility/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { showSnackBar } from '@/redux/notistackSlice'
import { useDispatch } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { buttonBg, buttonC } from '@/utility/const'

const Contents = ({ title, dashboard, currentPage, totalPages, contents }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredContents, setFilteredContents] = useState(contents)
  const dispatch = useDispatch()

  useEffect(() => {
    setFilteredContents(contents)
  }, [contents])

  // Function to handle search query change
  const handleSearchChange = e => {
    const query = e.target.value
    setSearchQuery(query)

    // Filter products based on the search query
    const filtered = contents.filter(
      c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.buttonText?.toLowerCase().includes(query.toLowerCase())
    )
    
    setFilteredContents(filtered)
  }

  const remove = async id => {
    try {
      dispatch(startLoading())
      const { data } = await axios.delete(`/api/content/${id}`)
      setFilteredContents(filteredContents.filter(i => i._id != id))
      dispatch(finishLoading())
      dispatch(showSnackBar({ message: 'Content Removed !' }))
    } catch (error) {
      console.log({ error })
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Deleting Content !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }
  const showOrHide = async c => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(`/api/content/${c._id}`, {
        isShown: !c.isShown
      })
      setFilteredContents(
        filteredContents.map(i =>
          i._id == c._id
            ? {
                ...i,
                isShown: i.isShown ? false : true
              }
            : i
        )
      )
      dispatch(finishLoading())
      dispatch(showSnackBar({ message: 'Content Updated !' }))
    } catch (error) {
      console.log({ error })
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Updating Content !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }

  return (
    <>
      {' '}
      {!dashboard && <h2>{title}</h2>}
      <div className={styles.wrapper} id='contents'>
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
              <button onClick={() => router.push('/admin/content/create')}>
                <span className={styles.plus__btn}>Add Content</span>
                <span className={styles.plus__icon}>+</span>
              </button>{' '}
            </div>
          </div>
        )}
        <div className={styles.table__wrapper}>
          {' '}
          <table>
            <thead>
              <tr>
                <th> Button</th>
                <th> Title</th>
                <th> Photo</th>
                {/* <th>CreatedAt</th> */}
                <th>Action</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {[...filteredContents]?.map((c, index) => (
                <tr
                  key={index}
                  style={
                    c.isShown
                      ? {}
                      : { background: 'lightgrey', color: 'lightgrey' }
                  }
                >
                  <td className={styles.action}>
                    {c.buttonText && (
                      <span
                        onClick={() => router.push(`/${c.buttonHref}`)}
                        style={{
                          background: `${buttonBg}`,
                          color: `${buttonC}`
                        }}
                      >
                        {c.buttonText}
                      </span>
                    )}
                  </td>

                  <td>{c.title}</td>
                  <td>
                    {c.image && (
                      <Image src={c.image} width='100' height='50' alt='' />
                    )}
                  </td>

                  <td className={styles.action}>
                    <span onDoubleClick={() => remove(c._id)}>Delete</span>
                    <span
                      onClick={() =>
                        router.push(`/admin/content/create?id=${c._id}`)
                      }
                    >
                      View
                    </span>
                    <span onClick={() => showOrHide(c)}>
                      {c.isShown ? 'Hide' : 'Show'}
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

export default Contents
