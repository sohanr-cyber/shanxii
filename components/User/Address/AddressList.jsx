import React, { useState } from 'react'
import styles from '../../../styles/User/Address/AddressList.module.css'
import AddressCard from './AddressCard'
import { useRouter } from 'next/router'
import NewAddress from './NewAddress'
const AddressList = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.new__address}>
        <NewAddress />
      </div> */}
      <div className={styles.top}>
        <h3>Manage Address</h3>
        <div
          className={styles.btn}
          onClick={() => router.push('?newAddress=true')}
        >
          <span className={styles.plus}>+</span>
          <span>New Address </span>
        </div>
      </div>
      <div className={styles.address__list}>
        {[1, 2, 2].map((item, index) => (
          <AddressCard key={item} />
        ))}
      </div>
    </div>
  )
}

export default AddressList
