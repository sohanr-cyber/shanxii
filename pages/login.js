import React from 'react'
import styles from '../styles/Login.module.css'
import Logo from '@/components/Utility/Logo'
import Link from 'next/link'

const login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        {' '}
        <div className={styles.logo}>
          <Logo />
        </div>
        <h2>Sign In to Account</h2>
        <p>Enter Your Email and Password to sign in</p>
        <form>
          <input type='email' placeholder='Enter Your Email' />
          <input type='password' placeholder='Enter Your Password' />
          <div className={styles.btn}>Sign In</div>
        </form>
        <p className={styles.route}>
          Dont have an account ?{' '}
          <Link href='/register'>Click here to create new account</Link>
        </p>
      </div>
    </div>
  )
}

export default login
