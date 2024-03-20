import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Admin/Card.module.css'
import PeopleIcon from '@mui/icons-material/People'

const colors = [
  'rgb(255, 0, 0, 0.1)',
  'rgb(0, 129, 0, 0.1)',
  'rgb(255, 255, 0, 0.1)',
  'rgb(131, 0, 131, 0.1)'
]

const Card = ({ item, index }) => {
  return (
    <div
      className={styles.card__wrapper}
      style={{
        background: `${colors[index]}`
      }}
    >
      <div className={styles.card__container}>
        {' '}
        <div className={styles.left}>
          <div className={styles.number}>{item.number}</div>
          <div className={styles.title}>{item.title}</div>
        </div>
        <div className={styles.right}>
          <Image src={item.icon} width='50' height='50' alt='icon' />{' '}
        </div>
      </div>
    </div>
  )
}

export default Card
