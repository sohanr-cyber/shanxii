import React, { useState } from 'react'
import styles from '../../styles/Admin/SideBar.module.css'
import Image from 'next/image'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import MapIcon from '@mui/icons-material/Map'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LogoutIcon from '@mui/icons-material/Logout'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Logo from '../Utility/Logo'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import CommentIcon from '@mui/icons-material/Comment'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const SideBar = ({ setOpen }) => {
  const router = useRouter()
  const [visible, setVisible] = useState('product')
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.exit} onClick={() => setOpen(setOpen(false))}>
          <ExitToAppIcon />
        </div>
      </div>
      <div className={styles.navigators}>
        {' '}
        <div className={styles.item} onClick={() => router.push('/dashobard')}>
          <div className={styles.icon}>
            <DashboardIcon />
          </div>
          <div className={styles.title}>Dashboard</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <ShoppingCartIcon />
          </div>
          <div className={styles.title}>Product</div>
          <div className={styles.icon}>
            <KeyboardArrowDownIcon
              onClick={() =>
                setVisible(prev => (prev == 'product' ? '' : 'product'))
              }
            />
          </div>
        </div>
        {visible == 'product' && (
          <div className={styles.inner__items}>
            <div
              className={styles.item}
              onClick={() => router.push('/admin/product')}
            >
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Product List</div>
            </div>{' '}
            <div
              className={styles.item}
              onClick={() => router.push('/admin/product/create')}
            >
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Add Product</div>
            </div>
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.icon}>
            <CategoryIcon />
          </div>
          <div className={styles.title}>Category</div>{' '}
          <div className={styles.icon}>
            <KeyboardArrowDownIcon
              onClick={() =>
                setVisible(prev => (prev == 'category' ? '' : 'category'))
              }
            />
          </div>
        </div>{' '}
        {visible == 'category' && (
          <div className={styles.inner__items}>
            <div
              className={styles.item}
              onClick={() => router.push('/admin/category')}
            >
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Category List</div>
            </div>{' '}
            <div
              className={styles.item}
              onClick={() => router.push('/admin/category/create')}
            >
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Add Category</div>
            </div>
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.icon}>
            <AssignmentTurnedInIcon />
          </div>
          <div className={styles.title}>Orders</div>
          <div className={styles.icon}>
            <KeyboardArrowDownIcon
              onClick={() =>
                setVisible(prev => (prev == 'order' ? '' : 'order'))
              }
            />
          </div>
        </div>
        {visible == 'order' && (
          <div className={styles.inner__items}>
            <div
              className={styles.item}
              onClick={() => router.push('/admin/order')}
            >
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Order List</div>
            </div>
            <div className={styles.item}>
              <div className={styles.icon}>
                <ShoppingCartIcon />
              </div>
              <div className={styles.title}>Add Order</div>
            </div>
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.icon}>
            <MapIcon />
          </div>
          <div className={styles.title}>Address</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <SupervisedUserCircleIcon />
          </div>
          <div className={styles.title}>Users</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <div className={styles.title}>Reviews</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <LogoutIcon />
          </div>
          <div className={styles.title}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
