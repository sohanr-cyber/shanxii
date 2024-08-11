import React, { useState } from 'react'
import styles from '@/styles/Utility/MailBox.module.css'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useDispatch } from 'react-redux'
import { showSnackBar } from '@/redux/notistackSlice'

const MailBox = ({ recipent, close }) => {
  const [mail, setMail] = useState({
    subject: '',
    content: '',
    email: recipent.email,
    name: recipent.fullName
  })
  const dispatch = useDispatch()

  const sendMail = async () => {
    if (!mail.content || !mail.subject || !mail.email) {
      dispatch(
        showSnackBar({
          message: 'Subject , Reciever Email &  Message Body are required !',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())

      const { data } = await axios.post('/api/utils/mail', {
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
      dispatch(finishLoading())
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
          <span>{recipent.email}</span>
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
            value={mail.content}
            onChange={e => setMail({ ...mail, content: e.target.value })}
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
