import React, { useEffect, useState } from 'react'
import styles from '../../styles/Chat/Chats.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCurrentChat } from '@/redux/chatSlice'

const Chats = () => {
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: `Bearer ${userInfo?.token}` }
  const currentChat = useSelector(state => state.chat.currentChat)
  const [chatList, setChatList] = useState([])
  const dispatch = useDispatch()

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`/api/contact/chat/${userInfo.id}`, {
        headers
      })
      setChatList(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])


  return (
    <div className={styles.wrapper}>
      {chatList?.map((c, index) => (
        c.participants.find(p => p._id != userInfo.id)?.email &&
        <div className={styles.chat} onClick={() => { dispatch(setCurrentChat({ ...c })) }} style={currentChat._id == c._id ? { background: "black", color: "white" } : {}}>
          {c.participants.find(p => p._id != userInfo.id)?.email}
        </div>
      ))}
    </div>
  )
}

export default Chats