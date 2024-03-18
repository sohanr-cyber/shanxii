import React from 'react'
import styles from '../../styles/User/Profile.module.css'
const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Your Profile</h2>
      <div className={styles.form}>
        <div className={styles.flex}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input />
          </div>
          <div className={styles.field}>
            <label>Email Address</label>
            <input />
          </div>
        </div>
        <div className={styles.flex}>
          {' '}
          <div className={styles.field}>
            <label>Phone Number</label>
            <input />
          </div>
          <div className={styles.field}>
            <label>Upload Your Photo</label>
            <input type='file' />
          </div>
        </div>
        <div className={styles.btn}>Save</div>
      </div>
    </div>
  )
}

export default Profile
