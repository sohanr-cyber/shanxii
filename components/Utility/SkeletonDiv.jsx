import React from 'react'
import styles from '../../styles/Utility/Skeleton.module.css'
const SkeletonDiv = ({ style }) => {
  return (
    <div
      className={styles.skeleton}
      style={style ? style : { width: '100%', height: '20px' }}
    ></div>
  )
}

export default SkeletonDiv
