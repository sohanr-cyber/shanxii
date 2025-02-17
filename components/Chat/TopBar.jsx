import React from 'react'
import styles from '../../styles/Chat/TopBar.module.css'
import { companyName } from '@/utility/const'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '@/redux/chatSlice';


const TopBar = () => {
    const dispatch = useDispatch()
    const currentChat = useSelector(state => state.chat.currentChat)
    const userInfo = useSelector(state => state.user.userInfo)


    return (
        <div className={styles.wrapper}>
            <div className={styles.top}><b>Conversation with {companyName}</b>
                <b onClick={() => dispatch(setCurrentChat({}))}>
                    <DoNotDisturbOnIcon />
                </b></div>
            <div className={styles.bottom}>To {currentChat.participants.find(i => i._id != userInfo.id).email} / {currentChat._id} </div>
        </div>
    )
}

export default TopBar