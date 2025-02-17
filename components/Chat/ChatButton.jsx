import React from 'react'
import styles from '../../styles/Chat/ChatButton.module.css'
import Image from 'next/image'
import { messenger } from '@/utility/const'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { handleContact } from '@/redux/pixelSlice'
import { setCurrentChat } from '@/redux/chatSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import axios from 'axios'


const ChatButton = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: `Bearer ${userInfo?.token}` }




  const handleClick = () => {
    fetchOrCreateChat()

    // router.push(messenger)
  }

  const fetchOrCreateChat = async () => {
    if (!userInfo) {
      dispatch(showSnackBar({
        message: "You Need To Login First To Chat !",
        option: {
          variant: "warning"
        }
      }))
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post("/api/contact/chat", {
        participants: [userInfo.id, "661f21b60fdf5b8aba0c8653"]
      }, {
        headers,
      })
      dispatch(finishLoading())
      dispatch(setCurrentChat({ ...data }))
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }


  return (
    <div className={styles.wrapper}>
      <Image
        src='https://cdn-icons-png.flaticon.com/128/5968/5968771.png'
        width={35}
        height={35}
        alt='chat button'
        onClick={() => handleClick()}
      />
    </div>
  )
}

export default ChatButton
