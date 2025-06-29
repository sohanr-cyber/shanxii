import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../../../styles/Category/Explore/GridLS.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SkeletonDiv from '@/components/Utility/SkeletonDiv'
import { AspectRatio } from '@mui/icons-material'
const GridLS = () => {
    const categories = useSelector(state => state.category.categories)?.slice(
        0,
        6
    )
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className={styles.wrapper}>
            {categories ? categories?.map((c, index) => (
                <div className={styles.category} onClick={() => router.push(`/shop?categories=${c._id}`)} onDoubleClick={() => userInfo?.role == "admin" && router.push(`/admin/category/create?id=${c._id}`)}>
                    <div className={styles.icon}>
                        <Image src={c?.image} width={50} height={50} alt="" />
                    </div>
                    <div className={styles.name}>
                        {c.name}
                    </div>
                    <div className={styles.description}>
                        Unveil Your natural radiance and glow
                    </div>
                    <div className={styles.btn}>
                        Shop Now</div>
                </div>
            )) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((c, index) => (
                <SkeletonDiv style={{ width: '60px', height: '90px', AspectRatio: "1/1" }} />
            ))}
        </div>
    )
}

export default GridLS