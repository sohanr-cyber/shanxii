// 'use server'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import TopNav from '@/components/TopNav'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Catergory from './shop/[category]'
import Categories from '@/components/Categories/Categories'
import ProductsByCategory from '@/components/ProductsByCategory'
import Footer from '@/components/Footer'
import BASE_URL from '@/config'
import axios from 'axios'
import fetchAndBlurImage from '@/utility/pika'
import Header2 from '@/components/Header/Header2'
import Header3 from '@/components/Header/Header3'
const inter = Inter({ subsets: ['latin'] })
const contents = [
  {
    image:
      'https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    image:
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    image:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    image:
      'https://images.pexels.com/photos/46212/men-s-shirt-shirt-attire-clothing-46212.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]
export default function Home ({ data, contents }) {
  return (
    <>
      <div className={styles.wrapper}>
        {/* <TopNav /> */}
        <div className={styles.categories}>
          <Categories />
        </div>
        {/* <ImageSlider images={contents.map(item => item.image)} /> */}
        {/* <Header2 contents={contents} /> */}
        <Header3 contents={contents} />
        {data.map((i, index) => (
          <ProductsByCategory
            category={i.category}
            products={i.products}
            subCategory={i.subCategory}
            key={index}
            rowDirection={(index + 1) % 2 == 0 ? true : false}
          />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps () {
  try {
    const start = new Date()
    const { data: contents } = await axios.get(`${BASE_URL}/api/content`)

    const { data } = await axios.get(`${BASE_URL}/api/product/bycategory`)
    const end = new Date()
    console.log(`time : ${end - start}ms`)
    return {
      props: {
        data,
        contents: contents.contents
      },
      revalidate: 10 // Revalidate at most every 10 seconds
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        data: [],
        contents: []
      },
      revalidate: 10 // Revalidate at most every 10 seconds
    }
  }
}
