import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../../styles/Category/Explore/Nested.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Nested = () => {

    const categories = useSelector(state => state.category.categories) || []
    const [selectedL, setSelectedL] = useState(categories[0] || null)
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    useEffect(() => {
        categories && setSelectedL(categories[0])
    }, [categories])

    const handleDoubleClick = (item) => {
        userInfo?.role == "admin" && router.push(`/admin/category/create?id=${item._id}`)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftC}>
                {categories?.map((c, i) => (
                    <div key={i} className={styles.leftC__item} onClick={() => setSelectedL(c)} onDoubleClick={() => handleDoubleClick(c)} style={selectedL?._id == c._id ? { borderLeft: "2px solid red" } : {}}>
                        <div className={styles.icon}>
                            <Image src={c.image || '/fallback.jpg'} width={35} height={35} alt={c.name || 'Category'} />
                        </div>
                        <div className={styles.title}>
                            {c.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.rightC}>
                {selectedL?.children?.map((ci, ii) => (
                    <RightCItem item={ci} key={ii} handleDoubleClick={handleDoubleClick} />
                ))}
            </div>
        </div>
    )
}

const RightCItem = ({ item, handleDoubleClick }) => {
    return (
        <div className={styles.rightC__item}>
            <div className={styles.top}>
                <h3 className={styles.name} onDoubleClick={() => handleDoubleClick(item)}>{item.name}</h3>
                <div className={styles.see__more}></div>
            </div>
            <div className={styles.flex}>
                {item.children?.map((cii, iii) => (

                    <div className={styles.leftC__item} onDoubleClick={() => handleDoubleClick(cii)}>
                        <div className={styles.icon}>
                            <Image src={cii.image || '/fallback.jpg'} width={35} height={35} alt={cii.name || 'Category'} />
                        </div>
                        <div className={styles.title}>
                            {cii.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Nested
