import React from 'react'
import styles from '../../styles/Utility/ProgressBar.module.css'

const PBar = ({ height, percentage, pixel }) => {
  return (
    <div
      className={styles.progressBar}
      style={{ height: `${height || '3px'}` }}
    >
      <div
        className={styles.progress}
        style={
          percentage
            ? { width: `${percentage}$` }
            : {
                width: `${pixel}px`
              }
        }
      ></div>
    </div>
  )
}

export default PBar
