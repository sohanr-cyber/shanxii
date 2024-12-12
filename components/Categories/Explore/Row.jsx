import React from 'react'
import { useSelector } from 'react-redux'
import styles from '@/styles/Category/Explore/Row.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
const Row = () => {
    const categories = useSelector(state => state.product.categories)?.slice(
        0,
        12
    )
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className={styles.wrapper}>
            {categories?.map((c, index) => (
                <div className={styles.category} onClick={() => router.push(`/shop?categories=${c._id}`)} onDoubleClick={() => userInfo?.role == "admin" && router.push(`/admin/category/create?id=${c._id}`)}>
                    <div className={styles.icon}>
                        <Image src={c?.image} width={50} height={50} alt="" />
                    </div>
                    <div className={styles.name}>
                        {c.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Row