import React from 'react'
import { logout } from '@/redux/userSlice'
import { useDispatch } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout'
import { useRouter } from 'next/router'
import { showSnackBar } from '@/redux/notistackSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const signout = () => {
    dispatch(logout())
    router.push('/login')
    dispatch(
      showSnackBar({
        message: 'You Logged Out !'
      })
    )
  }
  return (
    <div
      onClick={() => {
        signout()
      }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: 'red',
        gap: '15px',
        alignItems: 'center'
      }}
    >
      <LogoutIcon />
      <span>Logout</span>
    </div>
  )
}

export default Logout
