import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from './Utility/Logo'

const Footer = () => {
  const router = useRouter()

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Logo />
          <div className={styles.about}>
            At EShop, we are dedicated to providing you with the best shopping
            experience possible. From trendy fashion to cutting-edge
            electronics, we offer a wide range of products to suit every need
            and lifestyle.
          </div>
        </div>
        <div className={styles.mid}>
          <h2 className={styles.heading}>Links</h2>
          <div className={styles.flex}>
            <div className={styles.link}>Home</div>{' '}
            <div className={styles.link} onClick={() => router.push('/')}>
              Shop
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.link} onClick={() => router.push('/')}>
              Gents
            </div>
            <div className={styles.link}>Shoes</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.link} onClick={() => router.push('/')}>
              Kids
            </div>
            <div className={styles.link}>Winter Collection</div>
          </div>
          <div className={styles.flex}>
            <div
              className={styles.link}
              onClick={() => router.push('/privacy-policy')}
            >
              Privacy Policy
            </div>
            <div
              className={styles.link}
              onClick={() => router.push('/terms-and-conditions')}
            >
              Terms and Conditions
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.heading}>Contact</h2>
          <div className={styles.mail}>
            Address: House 41(meena bazar, lift 4), Gareeb-e-Newaz Avenue Road,
            Sector 11, Uttara, Dhaka
          </div>
          <div className={styles.mail}>
            Mail: <span>mail@gmail.com</span>
          </div>
          <div className={styles.call}>
            Phone: <span>+8802305825832</span>
          </div>
          <div className={styles.social__media__links}>
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/5968/5968764.png'}
              width='35'
              height='35'
              alt=''
            />
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/3955/3955024.png'}
              width='35'
              height='35'
              alt=''
            />
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/733/733585.png'}
              width='35'
              height='35'
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
