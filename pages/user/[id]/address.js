import React from 'react'
import styles from '../../../styles/User/Home.module.css'
import Navigator from '@/components/User/Navigator'
import AddressList from '@/components/User/Address/AddressList'

const Address = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Navigator />
      </div>
      <div className={styles.right}>
        <AddressList />
      </div>
    </div>
  )
}

export default Address
