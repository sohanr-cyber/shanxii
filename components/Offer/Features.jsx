import React from 'react'
import styles from '@/styles/Offer/Features.module.css'
import Image from 'next/image';
const features = [
  {
    title: "Free Shipping",
    description: "Free Shipping world wide",
    icon: "https://cdn-icons-png.flaticon.com/128/4947/4947265.png"
  },
  {
    title: "24 x 7 Service",
    description: "Online Service For 24 x 7",
    icon: "https://cdn-icons-png.flaticon.com/128/8555/8555771.png"
  },
  {
    title: "Online Pay",
    description: "Online Payment Available",
    icon: "https://cdn-icons-png.flaticon.com/128/2169/2169874.png"
  },
  {
    title: "Festival Offer",
    description: "Super Sale Upto 50% off",
    icon: "https://cdn-icons-png.flaticon.com/128/15206/15206352.png"
  },
  // {
  //   title: "100% Original",
  //   description: "100% Money Back",
  //   icon: "https://cdn-icons-png.flaticon.com/128/5579/5579172.png"
  // }
];


const Features = () => {
  return (
    <div className={styles.wrapper} >
      {features.map((f, index) => (
        <div className={styles.feature}>
          <div className={styles.icon}>
            <Image src={f.icon} width={40} height={40} alt="" />
          </div>
          <div className={styles.text}>
            <b>{f.title}</b>
            <div>
              {f.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features