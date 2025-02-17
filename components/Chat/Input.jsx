import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import styles from '../../styles/Chat/Input.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackBar } from '@/redux/notistackSlice';
import { staticPageGenerationTimeout } from '@/next.config';
import socket from '@/socket';
import { setFetchMessage } from '@/redux/chatSlice';


const Input = () => {
    const [message, setMessage] = useState({ text: "" })
    const userInfo = useSelector(state => state.user.userInfo)
    const currentChat = useSelector(state => state.chat.currentChat)


    const headers = { Authorization: `Bearer ${userInfo.token}` }
    const dispatch = useDispatch()

    const sendMessage = async () => {
        // if (!message.text && !message.attachment) {
        //     return
        // }
        try {
            const { data } = await axios.post(`/api/contact/message`, {
                chatId: currentChat._id,
                sender: userInfo?.id,
                text: message.text || new Date(),
                attachment: message.attachment
            }, { headers })

            if (data) {
                setMessage({ text: "", attachment: {} })
                socket.emit("sendMessage", {
                    ...data, receiver: currentChat.participants.find(p => p._id != userInfo.id)?._id || "0285032"
                })
                dispatch(setFetchMessage({}))
            }

        } catch (error) {
            dispatch(showSnackBar({
                message: "Error Sending Message !",
                option: {
                    variant: "error"
                }
            }))


            console.log(error)
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.area}>
                <textarea onChange={e => setMessage({ ...message, text: e.target.value })} value={message?.text}></textarea>
                <div className={styles.plus}>
                    <PhotoCameraIcon />
                </div>
            </div>
            <div className={styles.btn} onClick={() => sendMessage()}>
                <SendIcon />
            </div>
        </div>
    )
}

export default Input