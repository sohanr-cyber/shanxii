import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import Logo from '@/components/Utility/Logo'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/userSlice'
import { showSnackBar } from '@/redux/notistackSlice'

const Login = () => {
  const [user, setUser] = useState({})
  const router = useRouter()
  const dispatch = useDispatch()

  const signup = async () => {
    if (!user.password || !user.email) {
      dispatch(
        showSnackBar({
          message: 'Fill All The Field',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }

    try {
      const { data } = await axios.post('/api/user/login', {
        ...user
      })
      dispatch(login(data))
      dispatch(
        showSnackBar({
          message: 'Succesfully Logged In '
        })
      )
      router.push('/admin')
    } catch (error) {
      dispatch(
        showSnackBar({
          messaage: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )

      console.log(error)
    }
  }

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
          <input
            type='email'
            placeholder='Enter Your Email'
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
          <input
            type='password'
            placeholder='Enter Your Password'
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
          <div className={styles.btn} onClick={() => signup()}>
            Sign In
          </div>
        </form>
        <p className={styles.route}>
          Dont have an account ?{' '}
          <Link href='/register'>Click here to create new account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
