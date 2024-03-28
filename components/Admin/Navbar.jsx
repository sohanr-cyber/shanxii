import React, { useState } from 'react'
import styles from '../../styles/Admin/Navbar.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../Utility/Logo'
import Image from 'next/image'
import SideBar from './SideBar'
const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      {open && <SideBar setOpen={setOpen} />}
      <div className={styles.left}>
        <div className={styles.menu} onClick={() => setOpen(true)}>
          <MenuIcon />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.item}>
          <Image
            src='https://cdn-icons-png.flaticon.com/128/15414/15414285.png'
            width='35'
            height='35'
            alt=''
          />
        </div>
        <div className={styles.item}>
          <Image
            src='https://cdn-icons-png.flaticon.com/128/3665/3665909.png'
            width='35'
            height='35'
            alt=''
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar
