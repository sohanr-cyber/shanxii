import { setCurrentChat, setMessages } from '@/redux/chatSlice'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles/Chat/Messages.module.css'
import { buttonBg, buttonC } from '@/utility/const'
import socket from '@/socket'
import { showSnackBar } from '@/redux/notistackSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const Messages = () => {
    const currentChat = useSelector(state => state.chat.currentChat)
    const messages = useSelector(state => state.chat.messages)
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.userInfo)
    const fetchMessage = useSelector(state => state.chat.fetchMessage)




    const fetchMessages = async (currentChat) => {
        try {
            dispatch(startLoading())
            const { data } = await axios.get(`/api/contact/message/${currentChat._id}`)
            dispatch(setMessages(data))
            dispatch(finishLoading())

        } catch (error) {
            dispatch(showSnackBar({
                message: "Error While Retriving Message",
                option: {
                    variant: "error"
                }
            }))
            dispatch(finishLoading())
            console.log(error)
        }
    }
    const currentChatRef = useRef(currentChat);

    useEffect(() => {
        currentChatRef.current = currentChat;
    }, [currentChat]);
    
    const handleMessage = (message) => {
        if (!currentChatRef.current?._id) return;
    
        console.log("Message chatId:", message.chatId);
        console.log("CurrentChat ID (Ref):", currentChatRef.current._id);
    
        if (message.chatId === currentChatRef.current._id) {
            console.log("📩 New message received for current chat.");
            fetchMessages(currentChatRef.current);
        } else {
            console.log("🚨 Message belongs to another chat.");
            dispatch(showSnackBar({ message: `New message in chat ${message.chatId}` }));
        }
    };
    
    


    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socket.on("receiveMessage", handleMessage);
        return () => {
            socket.off("receiveMessage", handleMessage);
        };
    }, [])

    useEffect(() => {
        currentChat._id && fetchMessages(currentChat)
    }, [currentChat._id, fetchMessage])


    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.messages}>      {messages?.map((m, index) => (
                <span className={styles.message} style={m.sender._id != userInfo.id ? { alignSelf: "flex-start" } : {
                    background: `${buttonBg}`, color: `${buttonC}`, textAlign: "right", alignSelf: "flex-end"
                }}
                    ref={messagesEndRef}
                >
                    {m.text}
                </span>
            ))}</div>
        </div>
    )
}

export default Messages