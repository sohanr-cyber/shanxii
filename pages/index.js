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
import ProductsInColumn from '@/components/Products/ProductsInColumn'
import Off from '@/components/Offer/Off'
import Features from '@/components/Offer/Features'
import Row from '@/components/Categories/Explore/Row'
import ShopNow from '@/components/Offer/ShopNow'
import Subscribe from '@/components/Offer/Subscribe'
import { NextSeo } from 'next-seo'
import { generateSeoData } from '@/utility/helper'
import { seoData } from '@/utility/const'
import Grid from '@/components/Categories/Explore/Grid'
import Header4 from '@/components/Header/Header4'
import Header5 from '@/components/Header/Header5'
import GridLS from '@/components/Categories/Explore/GridLS'

export default function Home({ data, contents }) {
  return (
    <>
      <NextSeo
        {...seoData}
        openGraph={{
          ...seoData.openGraph,
          images: [
            {
              url: contents.find(i => i.position === "header")?.image || '',
              alt: 'ElectroHub Electronics',
              width: 1200,
              height: 630,
            },
          ],
        }}
      />


      <div className={styles.wrapper}>
        {/* <TopNav /> */}
        <div className={styles.categories}>
          {/* <Categories /> */}
          {/* <List /> */}
          <List2 />
        </div>
        {/* <ImageSlider images={contents.map(item => item.image)} /> */}
        <Header3 contents={contents.filter(i => i.position == "header")} />
        {/* <Header5 contents={contents.filter(i => i.position == "header")} /> */}
        <div className={styles.categoriesInRow}>
          <Row />
          {/* <Grid /> */}
        </div>
        {data.slice(0, -3)?.length > 0 && data.slice(0, -3).map((i, index) => (
          <ProductsByCategory2
            category={i.category}
            products={i.products}
            subCategory={i.subCategory}
            key={index}
            structure={'grid'}
          />
        ))}
        <div className={styles.off}>
          <Off content={contents.filter(i => i.position == "deal")[0]} />
        </div>
        <div className={styles.off}>
          <ShopNow content={contents.filter(i => i.position == "cta")[0]} />
        </div>
        <div className={styles.productsInColumn}>
          {data.slice(-3).map((i, index) => (
            <div className={styles.products} key={index}
            >
              <ProductsInColumn
                category={i.category}
                products={i.products?.slice(0, 4)}
                subCategory={i.subCategory}
                // rowDirection={(index + 1) % 2 == 0 ? true : false}
                structure={'grid'}
              />
            </div>
          ))}
        </div>
        <div className={styles.features}>
          <Features />
        </div>
        <div className={styles.off}>
          <Subscribe content={contents.filter(i => i.position == "subscription")[0]} />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
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
