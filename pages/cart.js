import React, { useEffect, useState } from 'react'
import styles from '../styles/Cart/Home.module.css'
import CartItems from '@/components/Cart/CartItems'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Checkout from '@/components/Cart/Checkout'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { addItem, removeItem } from '@/redux/cartSlice'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getPrice } from '@/utility/helper'
import { NextSeo } from 'next-seo'
import { orderCartSeoData } from '@/utility/const'

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items)
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const incrementQuantity = item => {
    dispatch(
      addItem({
        ...item,
        quantity: item.quantity + 1
      })
    )
  }

  const decrementQuantity = item => {
    if (item.quantity > 1) {
      dispatch(
        addItem({
          ...item,
          quantity: item.quantity - 1
        })
      )
    }
  }

  return (
    <>
      <NextSeo {...orderCartSeoData} />{' '}
      <div className={styles.wrapper}>
        <h2>Your Cart</h2>
        <div className={styles.table__wrapper}>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th className={styles.clear__button}>Clear Cart</th>
              </tr>
            </thead>
            <tbody>
              {isClient &&
                cartItems?.map((item, index) => (
                  <tr key={index}>
                    <td className={styles.product} onClick={() => router.push(`/product/${item.product.slug}`)}>
                      <div className={styles.left}>
                        <Image
                          src={item.image.image}
                          width='40'
                          height='40'
                          alt=''
                        />
                      </div>
                      <div className={styles.right}>
                        <div>{item.product.name}</div>
                        <div style={{ fontSize: '80%', marginTop: '5px' }}>
                          {item.size && (
                            <>Size : {" "} {item.size}</>
                          )}
                          {item.image.color && (
                            <>Color : {" "} {item.image.color}</>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      ৳{' '}
                      {parseInt(
                        item.product.price -
                        item.product.price * (item.product.discount / 100)
                      ).toFixed(2)}
                    </td>
                    <td>
                      {' '}
                      <div className={styles.quantity}>
                        <span onClick={() => incrementQuantity(item)}>
                          <AddIcon />
                        </span>
                        <span>{item.quantity}</span>
                        <span onClick={() => decrementQuantity(item)}>
                          <RemoveIcon />
                        </span>
                      </div>
                    </td>
                    <td>
                      ৳
                      {(
                        item.quantity *
                        getPrice(item.product.price, item.product.discount)
                      ).toFixed(2)}
                    </td>
                    <td
                      className={styles.x}
                      onClick={() => dispatch(removeItem(item))}
                    >
                      X
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {isClient && <Checkout cartItems={cartItems} />}
      </div>
    </>
  )
}

export default Cart
