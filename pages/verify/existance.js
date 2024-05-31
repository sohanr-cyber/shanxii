import React, { useState } from 'react'
import styles from '../../styles/Login.module.css'
import Logo from '@/components/Utility/Logo'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/redux/userSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { NextSeo } from 'next-seo'
import { loginSeoData } from '@/utility/const'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()

  const SendCode = async () => {
    if (!email) {
      return
    }

    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/user/verify/existance', {
        email
      })

      if (data.error) {
        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'error'
            }
          })
        )
      }

      if (data && !data.error) {
        console.log(data)
        dispatch(
          showSnackBar({
            message: 'A Code has been Sent To Your Mail'
          })
        )
        router.push('/verify/reset')
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }
  return (
    <>
      <NextSeo {...loginSeoData} />
      <div className={styles.wrapper}>
        <div className={styles.form__container}>
          {' '}
          <div className={styles.logo}>
            <Logo />
          </div>
          <h2>Reset Your Account Password</h2>
          <form>
            <input
              type='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <div className={styles.btn} onClick={() => SendCode()}>
              Submit
            </div>
          </form>
          <p className={styles.route}>
            Dont have an account ?{' '}
            <Link href='/register'>Click here to create new account</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
