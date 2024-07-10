import React, { useEffect, useState } from 'react'
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
import { verify } from 'jsonwebtoken'

const Login = () => {
  const [code, setCode] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.userInfo)
  const [cooldown, setCooldown] = useState(60)

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prevCooldown => prevCooldown - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [cooldown])

  console.log({ cooldown })

  const verifyCode = async () => {
    if (!code) {
      dispatch(
        showSnackBar({
          message: 'Type The Code To Verify',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    if (code.length != 6) {
      dispatch(
        showSnackBar({
          message: 'Code must be of 6 Characters',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }

    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/user/verify', {
        code,
        userId: userInfo.id
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
        dispatch(
          showSnackBar({
            message: 'Verification Complete  ',
            option: {
              variant: 'success'
            }
          })
        )
        // router.push(`/profile/${data.profileId}`)
        dispatch(login(data))
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  const resend = async () => {
    if (cooldown != 0) {
      dispatch(
        showSnackBar({
          message: `Try After ${cooldown} seconds`,
          option: {
            variant: 'info'
          }
        })
      )
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/user/verify',
        {
          id: userInfo.id
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      if (data && !data.error) {
        setCooldown(60)
        dispatch(
          showSnackBar({
            message: 'Verification Code Sent To Your Mail '
          })
        )
        // router.push('/verify')
      }

      if (data.error) {
        // setCooldown(60)

        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'info'
            }
          })
        )
      }

      dispatch(finishLoading())
    } catch (error) {
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
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
          <h2>Create an Account</h2>
          <p>We Have Sent An Verification Code To Your Email</p>
          <form>
            <input
              type='email'
              placeholder='Enter Verification Code'
              value={code}
              onChange={e => setCode(e.target.value)}
            />

            <div className={styles.btn} onClick={() => verifyCode()}>
              Submit
            </div>
          </form>{' '}
          <p className={styles.route}>
            Did not get the code ?
            <span className={styles.cooldown}>
              <span onClick={() => resend()}>Resend</span>
              <span>{cooldown}</span>
            </span>
          </p>
          <p className={styles.route}>
            Already have an account ?{' '}
            <Link href='/login'>Click here to Sign In</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
