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
import ProductsByCategory from '@/components/Products/ProductsByCategory'
import Footer from '@/components/Footer'
import BASE_URL from '@/config'
import axios from 'axios'
import Header2 from '@/components/Header/Header2'
import Header3 from '@/components/Header/Header3'
import List from '@/components/Categories/List'
import List2 from '@/components/Categories/List2'
import ProductsByCategory2 from '@/components/Products/ProductsByCategory2'
const inter = Inter({ subsets: ['latin'] })

export default function Home ({ data, contents }) {
  return (
    <>
      <div className={styles.wrapper}>
        {/* <TopNav /> */}
        <div className={styles.categories}>
          {/* <Categories /> */}
          {/* <List /> */}
          <List2 />
        </div>
        {/* <ImageSlider images={contents.map(item => item.image)} /> */}
        {/* <Header2 contents={contents} /> */}
        <Header3 contents={contents} />
        {data.map((i, index) => (
          <ProductsByCategory2
            category={i.category}
            products={i.products}
            subCategory={i.subCategory}
            key={index}
            // rowDirection={(index + 1) % 2 == 0 ? true : false}
            structure={'grid'}
          />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps () {
  try {
    const start = new Date()
    const { data: contents } = await axios.get(
      `${BASE_URL}/api/content?show=true`
    )

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
