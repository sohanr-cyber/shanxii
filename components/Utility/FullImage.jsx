import React from 'react'
import styles from '../../styles/Utility/FullImage.module.css'
import Image from 'next/image'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { base64Img } from '@/utility/const';

const FullImage = ({ image, setFullImage }) => {
    return (
        <div className={styles.wrapper} >
            <div className={styles.image__wrapper}>
                <div className={styles.close} onClick={() => setFullImage("")} >X</div>
                <Image src={image} width={1280} height={720} alt="" blurDataURL={base64Img} />
                <div className={styles.left__icon}>
                    <KeyboardArrowLeftIcon />
                </div>
                <div className={styles.right__icon}>
                    <KeyboardArrowRightIcon />
                </div>
            </div>
        </div>
    )
}

export default FullImage