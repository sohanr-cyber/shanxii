import React from 'react'
import styles from '@/styles/Offer/ShopNow.module.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const ShopNow = ({ content }) => {
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className={styles.wrapper}
            style={{
                backgroundImage: `url('${content?.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} >
            <div className={styles.surface} onDoubleClick={() => { userInfo?.role == "admin" && router.push(`/admin/content/create?id=${content._id}`) }}
              style={{
                color: `${content.textColor}`

            }}  >
                <b>
                    {content?.title}
                </b>
                <p>
                    {content?.description}
                </p>
                {content?.buttonText && content?.buttonHref && (<div className={styles.btn}>Shop Now</div>
                )}
            </div>
        </div>
    )
}

export default ShopNow