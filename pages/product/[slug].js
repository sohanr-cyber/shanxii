import React, { useEffect, useState } from 'react'
import styles from '../../styles/Product/Details.module.css'
import axios from 'axios'
import BASE_URL from '@/config'
import { Rating, Stack } from '@mui/material'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, addToBuyNow } from '@/redux/cartSlice'
import { useRouter } from 'next/router'
import { generateProductSeoData, generateUniqueID, getPrice, hexToRgba } from '@/utility/helper'
import { showSnackBar } from '@/redux/notistackSlice'
import { NextSeo } from 'next-seo'
import ProductsByCategory from '@/components/Products/ProductsByCategory'
import {
  handleAddItemToCart,
  handleInitiateCheckout,
  handleViewProduct
} from '@/redux/pixelSlice'
import Loading from '@/components/Utility/Loading'
import ProductsByCategory2 from '@/components/Products/ProductsByCategory2'
import { themeBg, themeC } from '@/utility/const'
import CartItems from '@/components/Cart/CartItems'

export async function getStaticPaths() {
  try {
    // Fetch the list of possible values for slug
    const response = await axios.get(`${BASE_URL}/api/product/slugs`)
    const products = response.data // Assuming the API returns an array of slugs

    // Map the slugs to the required format
    const paths = products.map(p => ({
      params: { slug: p.slug }
    }))

    return {
      paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.log(
      'Error fetching product slugs:',
      error.response ? error.response.data : error.message
    )
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params

  try {
    const start = new Date()
    const { data } = await axios.get(
      `${BASE_URL}/api/product/slug/${slug}?blur=true`
    )
    const end = new Date()

    const categories = data.categories.map(i => i._id).join(',')
    console.log(categories)

    let relatedProducts = []
    if (categories) {
      const resp = await axios.get(
        `${BASE_URL}/api/product/filter?categories=${categories}`
      )

      relatedProducts = resp.data.products.filter(i => i._id != data._id)
    }
    console.log(`Data fetching time: ${end - start}ms`)

    return {
      props: {
        product: data,
        relatedProducts
      },
      revalidate: 10 // Revalidate at most every 10 seconds
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        product: {},
        relatedProducts: [],
        error: error
      }
    }
  }
}

const Product = ({ product, error, relatedProducts }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(product?.sizes?.split(',')[0])
  const [thumbnail, setThumbnail] = useState(product?.thumbnail)
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false)
  const [blurDataURL, setBlurDataURL] = useState(null)
  const ReactPixel = useSelector(state => state.pixel.pixel)
  const buyNowItems = useSelector(state => state.cart.buyNow)
  const cartItems = useSelector(state => state.cart.items)

  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState({
    ...product.images[0]
  })

  useEffect(() => {
    setIsClient(true)
    // setThumbnail(product.thumbnail)
    setCurrentImage(product.images[0] || { image: product.thumbnail, colors: product.thumbnailColors, uid: generateUniqueID(cartItems.map(image => image.uid)) })
  }, [product.slug])

  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const handleAddToCart = () => {
    dispatch(handleAddItemToCart(product))

    if (product.stockQuantity < 1) {
      dispatch(
        showSnackBar({
          message: 'Out Of Stock !',
          option: {
            variant: 'info'
          }
        })
      )
      return
    }
    dispatch(
      addItem({
        product,
        size,
        image: currentImage,
        quantity,
        available: product.stockQuantity
      })
    )
    dispatch(showSnackBar({ message: 'Product Added To Cart ' }))
  }

  const handleBuyNow = () => {
    if (product.stockQuantity < 1) {
      dispatch(
        showSnackBar({
          message: 'Out Of Stock !',
          option: {
            variant: 'info'
          }
        })
      )
      return
    }
    dispatch(
      addToBuyNow({
        product,
        size,
        image: currentImage,
        quantity,
        available: product.stockQuantity
      })
    )
    dispatch(handleAddItemToCart(buyNowItems))
    router.push('/checkout/address?buyNow=true')
  }

  return (
    <>
      {loading && <Loading />}
      <NextSeo {...generateProductSeoData(product)} />{' '}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.left}
          // style={{ background: `${currentImage?.colors && hexToRgba(currentImage?.colors[0], 0.5)}` }}
          >
            <div className={styles.image__container}
            >
              <Image
                src={currentImage.image}
                width='400'
                height='400'
                alt=''
                placeholder='blur'
                blurDataURL={product.placeholder}
              />
            </div>
            <div className={styles.flex}>
              {product.images.map((item, index) => (
                <div className={styles.inner__imageContainer}>
                  <Image
                    src={item.image}
                    width='50'
                    height='50'
                    alt=''
                    key={index}
                    onClick={() => setCurrentImage(item)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.title}>{product.name}</h2>
            <div className={styles.flex}>
              {/* <div className={styles.ratings}>
                {' '}
                <Stack spacing={1}>
                  <Rating
                    name='half-rating-read'
                    defaultValue={product.ratings}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                </Stack>
              </div> */}
              <div
                className={styles.stock}
                style={
                  product.stockQuantity > 0
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {product.stockQuantity > 0
                  ? `In Stock(${product.stockQuantity})`
                  : 'Out Of Stock'}
              </div>
            </div>
            <h1 className={styles.price}>
              ৳ {getPrice(product.price, product.discount)}
            </h1>
            {product.metaDescription && <p>
              {product.metaDescription}
            </p>}
            {product?.images.map(e => e.color).length > 0 && (
              <div className={`${styles.colors} ${styles.sizes}`}>
                <div>Colors</div>
                <div className={styles.options}>
                  {product?.images.map((item, index) => (
                    <div
                      className={styles.option}
                      key={index}
                      style={
                        item.uid == currentImage.uid
                          ? { background: `${item.color}`, color: "white", border: `2px solid ${themeC}` }
                          : { background: `${item.color}`, color: 'white' }
                      }
                      onClick={() => setCurrentImage(item)}
                    >

                    </div>
                  ))}
                </div>
              </div>
            )}

            {product?.sizes && (
              <div className={styles.sizes}>
                <div>Sizes</div>
                <div className={styles.options}>
                  {product?.sizes?.split(',').map((item, index) => (
                    <div
                      className={styles.option}
                      key={index}
                      style={
                        item == size
                          ? { background: 'black', color: 'white' }
                          : {}
                      }
                      onClick={() => setSize(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.flex}>
              <div className={styles.quantity}>
                <span onClick={incrementQuantity}>
                  <AddIcon />
                </span>
                <span>{quantity}</span>
                <span onClick={decrementQuantity}>
                  <RemoveIcon />
                </span>
              </div>
            </div>
            <div className={styles.flex}> <button onClick={() => handleAddToCart()}>Add To Cart</button>
              <button onClick={() => handleBuyNow()}>Buy Now</button>
              {isClient && userInfo?.role == 'admin' && (
                <button
                  onClick={() =>
                    router.push(`/admin/product/create?id=${product._id}`)
                  }
                >
                  Update Product
                </button>
              )}</div>

            {product.categories?.length > 0 && (
              <div className={styles.categories}>
                Categories:{' '}
                {product.categories?.map((item, index) => (
                  <span key={index}>{item.name}</span>
                ))}
              </div>
            )}
            {product.attributes.length > 0 && product.attributes[0]?.name?.length > 0 && (
              <div className={styles.attributes}>
                <b>Charecteristics</b>
                {product.attributes.map((i, index) => (
                  <div className={styles.flex} style={{ justifyContent: "space-between" }}>
                    <div className={styles.key}>
                      {i.name}
                    </div>
                    <div className={styles.key}>
                      {i.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* <div className={styles.flex}>
                <button>Add To Wishlist</button>
              </div> */}
          </div>
        </div>
        <div className={styles.bottom__container}>
          <div className={styles.top}>
            <button className={styles.button}>Description</button>
            {/* <button className={styles.button}>Reviews</button> */}
          </div>
          <div className={styles.description}>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      </div>
      {relatedProducts?.length > 0 && (
        <ProductsByCategory2
          category={'Related Products'}
          products={relatedProducts}
        />
      )}
    </>
  )
}

export default Product
