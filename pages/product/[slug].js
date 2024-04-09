import React, { useState } from 'react'
import styles from '../../styles/Product/Details.module.css'
import axios from 'axios'
import BASE_URL from '@/config'
import { Rating, Stack } from '@mui/material'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch } from 'react-redux'
import { addItem, addToBuyNow } from '@/redux/cartSlice'
import { useRouter } from 'next/router'
import { getPrice } from '@/utilty/helper'
const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(product.sizes?.split(',')[0])
  const [thumbnail, setThumbnail] = useState(product.thumbnail)
  const router = useRouter()
  const dispatch = useDispatch()
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
    dispatch(
      addItem({
        product,
        size,
        quantity,
        available: product.stockQuantity
      })
    )
  }

  const handleBuyNow = () => {
    dispatch(
      addToBuyNow({
        product,
        size,
        quantity,
        available: product.stockQuantity
      })
    )
    router.push('/checkout/address?buyNow=true')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.image__container}>
            <Image src={thumbnail} width='400' height='400' alt='' />
          </div>
          <div className={styles.flex}>
            {product.images?.map((item, index) => (
              <Image
                src={item}
                width='50'
                height='50'
                alt=''
                key={index}
                onClick={() => setThumbnail(item)}
              />
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>{product.name}</h2>
          <div className={styles.flex}>
            <div className={styles.ratings}>
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
            </div>
            <div className={styles.stock}>
              {product.stockQuantity > 0
                ? `In Stock(${product.stockQuantity})`
                : 'Out Of Stock'}
            </div>
          </div>
          <h1 className={styles.price}>
            ৳ {getPrice(product.price, product.discount)}
          </h1>

          {product.sizes && (
            <div className={styles.sizes}>
              <div>Sizes</div>
              <div className={styles.options}>
                {product.sizes?.split(',').map((item, index) => (
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
            <button onClick={() => handleAddToCart()}>Add To Cart</button>
            <button onClick={() => handleBuyNow()}>Buy Now</button>
            <button
              onClick={() =>
                router.push(`/admin/product/create?id=${product._id}`)
              }
            >
              Update Product
            </button>
          </div>

          {product.categories?.length > 0 && (
            <div className={styles.categories}>
              Categories:{' '}
              {product.categories?.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
            </div>
          )}

          <div className={styles.flex}>
            <button>Add To Wishlist</button>
          </div>
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
  )
}

export default Product

export async function getServerSideProps (context) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/product/slug/${context.query.slug}`
    )
    return {
      props: {
        product: response.data
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        product: {}
      }
    }
  }
}
