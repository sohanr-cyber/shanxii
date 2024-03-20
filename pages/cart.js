import React from 'react'
import styles from '../styles/Cart/Home.module.css'
import CartItems from '@/components/Cart/CartItems'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Checkout from '@/components/Cart/Checkout'
const cart = () => {
  return (
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
              <th>Cealr Cart</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item, index) => (
              <tr key={index}>
                <td>product - {item}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Checkout />
    </div>
  )
}

export default cart
