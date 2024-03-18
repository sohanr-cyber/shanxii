import React from 'react'
import styles from '../styles/Login.module.css'
import Logo from '@/components/Utility/Logo'
import Link from 'next/link'

const register = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        {' '}
        <div className={styles.logo}>
          <Logo />
        </div>
        <h2>Create an Account</h2>
        <form>
          <input type='text' placeholder='Enter Your First Name' />
          <input type='text' placeholder='Enter Your Last Name' />

          <input type='text' placeholder='Enter Your Phone Number' />

          <input type='email' placeholder='Enter Your Email' />
          <input type='password' placeholder='Enter Your Password' />
          <div className={styles.btn}>Create Account</div>
        </form>
        <p className={styles.route}>
          Already have an account ?{' '}
          <Link href='/login'>Click here to Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default register
