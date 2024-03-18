import React, { useState } from 'react'
import styles from '../../../styles/User/Address/AddressCard.module.css'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const AddressCard = () => {
  const [expand, setExpand] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.type}>Home Address</div>
        <div className={styles.edit}>
          {expand ? (
            <>
              <DeleteIcon />

              <EditIcon />

              <HighlightOffIcon onClick={() => setExpand(false)} />
            </>
          ) : (
            <MoreHorizIcon onClick={() => setExpand(true)} />
          )}
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.left}>
          <div className={styles.name}>Imran</div>
          <div className={styles.phone}>+8801797011232</div>
          <div className={styles.location}>
            Uttara 10 no. Sector, Road Number 12,house no:69, Uttara, Dhaka
            City, Dhaka
          </div>
        </div>
        <div className={styles.right}>
          <CheckCircleOutlineIcon />
        </div>
      </div>
    </div>
  )
}

export default AddressCard
