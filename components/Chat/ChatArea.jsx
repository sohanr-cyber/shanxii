import React, { useEffect } from 'react'
import styles from '../../styles/Chat/ChatArea.module.css'
import TopBar from './TopBar'
import Messages from './Messages'
import Input from './Input'
import Chats from './Chats'

import { useDispatch, useSelector } from 'react-redux'
import { userSlice } from '@/redux/userSlice'
import socket from '@/socket'
import { showSnackBar } from '@/redux/notistackSlice'
import { setFetchMessage } from '@/redux/chatSlice'

const ChatArea = () => {
    const userInfo = useSelector(state => state.user.userInfo)
    const headers = { Authorization: `Bearer ${userInfo?.token}` }
    const currentChat = useSelector(state => state.chat.currentChat)
    const dispatch = useDispatch()
    const fetchMessage = useSelector(state => state.chat.fetchMessage)



    // useEffect(() => {
    //     requestNotificationPermission(userId);
    // }, [])




    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            console.log("✅ Socket Connected");
        }

        return () => {
            console.log("❌ Socket Disconnected");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.emit("join", userInfo.id);
        console.log(`🟢 User ${userInfo.id} joined`);

    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Chats />
            </div>
            <div className={styles.right}><TopBar />
                <Messages />
                <div className={styles.input}>
                    <Input />
                </div>
            </div>
        </div>
    )
}

export default ChatArea