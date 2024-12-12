import React from 'react'
import styles from '@/styles/Offer/Subscribe.module.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
const Subscribe = ({ content }) => {
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className={styles.wrapper} style={{
            backgroundImage: `url('${content?.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className={styles.surface} onDoubleClick={() => { userInfo?.role == "admin" && router.push(`/admin/content/create?id=${content._id}`) }}
            >
                <b>
                    {content?.title}
                </b>
                <p>
                    {content?.description}
                </p>
                <div className={styles.inputField}>
                    <input placeholder='Enter Your Email' type="email"></input>
                    <div className={styles.btn}>Subscribe</div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe