import React from 'react'
import styles from '../../../styles/User/Address/newAddress.module.css'

const NewAddress = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        <div className={styles.flex}>
          <h3 className={styles.title}>Add Shipping Address</h3>
          <div className={styles.close}>X</div>
        </div>
        <form className={styles.form}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input type='text' />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input type='text' />
          </div>
          <div className={styles.field}>
            <label>Select Delivery Area</label>
            <input type='text' />
          </div>
          <div className={styles.field}>
            <label>Address</label>
            <input type='text' placeholder='House, Flat No, Road' />
          </div>

          <div className={styles.field}>
            <label>Address Type</label>
            <div className={styles.flex__addressType}>
              <span>Home</span>
              <span>Office</span>
              <span>HomeTown</span>
            </div>
          </div>
        </form>
        <div className={styles.flex__btn}>
          <div className={styles.btn}>Save</div>
          <div className={styles.btn}>Cancel</div>
        </div>
      </div>
    </div>
  )
}

export default NewAddress
