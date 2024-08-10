import React, { useState } from 'react'
import styles from '@/styles/Utility/MailBox.module.css'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useDispatch } from 'react-redux'
import { showSnackBar } from '@/redux/notistackSlice'

const MailBox = ({ recipents, close }) => {
  const [mail, setMail] = useState({
    subject: '',
    message: '',
    email: recipents[0]?.email,
    name: recipents[0]?.name
  })
  const dispatch = useDispatch()

  const sendMail = async () => {
    if (!mail.message || !mail.subject) {
      dispatch(
        showSnackBar({
          message: 'Subject & Message Body is required !',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())

      const { data } = await axios.post('/api/user/mail', {
        ...mail
      })

      if (data.message) {
        dispatch(
          showSnackBar({
            message: data.message
          })
        )
        close()
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(startLoading())
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
      console.log(error)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span>New Message</span>
        <span onClick={() => close()}>X</span>
      </div>
      <div className={styles.box}>
        <div className={styles.sender}>
          <b>From :</b> muslimmatchmaker001@gmail.com
        </div>{' '}
        <div className={styles.recipents}>
          <b> To :</b>
          {[...recipents].map((item, index) => (
            <span key={index}>{item.email}</span>
          ))}
        </div>
        <div className={styles.subject}>
          <label>
            <b>Subject :</b>
          </label>
          <input
            type='text'
            value={mail.subject}
            onChange={e => setMail({ ...mail, subject: e.target.value })}
          ></input>
        </div>
        <div className={styles.textArea}>
          <textarea
            value={mail.message}
            onChange={e => setMail({ ...mail, message: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.button} onClick={() => sendMail()}>
          Send
        </div>
      </div>
    </div>
  )
}

export default MailBox
