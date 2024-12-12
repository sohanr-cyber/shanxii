import React from 'react'
import styles from '@/styles/Offer/Off.module.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Off = ({ content }) => {
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className={styles.wrapper} style={{
            backgroundImage: `url('${content.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        >
            <div className={styles.surface} onDoubleClick={() => { userInfo?.role == "admin" && router.push(`/admin/content/create?id=${content._id}`) }}
            >
                <b>
                    {content.title}
                </b>
                <div className={styles.code}>
                    Use Coupon Code : 285032
                </div>
            </div>
        </div>
    )
}

export default Off