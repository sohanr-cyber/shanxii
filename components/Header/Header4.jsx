import React, { useEffect, useState } from 'react'
import styles from '../../styles/Header/Header4.module.css'
import ListIcon from '@mui/icons-material/List';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { themeBg } from '@/utility/const';

const Header4 = ({ contents }) => {
    const topCategories = [
        {
            name: "New Arrival",
            route: ""
        },
        {
            name: "Best Seller",
            rotue: ""
        },
        {
            name: "Featured Prdouct",
            route: ""
        },
        {
            name: "Men's",
            route: ""
        },
        {
            name: "Women",
            route: ""
        }
    ]
    const categories = useSelector(state => state.category.categories)
    const [currentSlide, setCurrentSlide] = useState(0)
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)
    const [selected, setSelected] = useState({})
    const [selectedCC, setSelectedCC] = useState({})

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % contents.length)
        }, 5000) // Adjust the interval time as needed (in milliseconds)

        return () => {
            clearInterval(interval)
        }
    }, [contents.length])
    return (
        <div className={styles.container}>
            <div className={styles.wrapper} onMouseLeave={() => { setSelected({}) }}>
                <div className={styles.left}>
                    <div className={styles.category} style={{ background: `${themeBg}`, color: "white" }} >
                        <ListIcon />
                        <span>All Categories</span>
                    </div>
                    {categories?.map((c, i) => (
                        <div className={styles.category} onMouseEnter={() => setSelected(c)} style={selected._id ? {
                            borderRight: `${selected._id == c._id ? "none" : "1px solid grey"}`,
                            borderTop: `${selected._id == c._id ? "1px solid grey" : "none"}`,
                            borderBottom: `${selected._id == c._id ? "1px solid grey" : "none"}`
                        } : {}}>
                            <Image src={c.image} width={20} height={20} alt={""} />
                            <span>{c.name}</span>
                        </div>
                    ))}

                </div>
                <div className={styles.right}>
                    {selected._id && <div className={styles.selectedCategories}>
                        <div className={styles.ccategories}>
                            {selected.children.map((cc, i) => (
                                <div className={styles.ccategory}>
                                    <b>  {cc.name}</b>
                                    <hr />
                                    {cc.children.map((ccc, i) => (
                                        <div>
                                            {ccc.name}
                                        </div>
                                    ))}
                                </div>


                            ))}
                        </div>
                    </div>}
                    <div className={styles.top}>
                        {topCategories.map((tc, i) => (
                            <div className={styles.item}>
                                {tc.name}
                            </div>
                        ))}
                    </div>
                    <div className={styles.content}>
                        {currentSlide.title}
                        <Image src={contents[currentSlide].image} width={720} height={720} alt="no image" />
                    </div>
                    <div className={styles.categories}>
                        {[1, 2, 3].map(i => (
                            <div className={styles.item}>
                                <div className={styles.title}>
                                    Women's Fashion

                                </div>
                                <div className={styles.discount}>
                                    50% Off Shipping
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header4