import React, { useEffect, useState } from 'react'
import styles from '../../styles/Utility/FullImage.module.css'
import Image from 'next/image'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { base64Img, themeTransparent } from '@/utility/const';
import { current } from '@reduxjs/toolkit';

const FullImage = ({ image, setFullImage, images, placeholder }) => {
    const [currentImage, setCurrentImage] = useState(image)
    const indx = images?.indexOf(currentImage)
    useEffect(() => { setCurrentImage(image) }, [image])

    const nextImage = () => {
        if (indx + 1 >= images.length)
            return
        setCurrentImage(images[indx + 1])
    }
    const prevImage = () => {
        if (indx <= 0)
            return
        setCurrentImage(images[indx - 1])
    }

    return (
        <div className={styles.wrapper} >
            <div className={styles.image__wrapper}>
                <div className={styles.close} onClick={() => setFullImage("")} > X</div>
                <Image key={currentImage} src={currentImage} width={1280} height={720} alt="" placeholder='blur'
                    blurDataURL={placeholder} />
                <div className={styles.left__icon} onClick={() => prevImage()} style={indx <= 0 ? { background: themeTransparent } : {}} >
                    <KeyboardArrowLeftIcon />
                </div>
                <div className={styles.right__icon} onClick={() => nextImage()} style={indx + 1 >= images.length ? { background: themeTransparent } : {}} >
                    <KeyboardArrowRightIcon />
                </div>
            </div>
        </div>
    )
}

export default FullImage