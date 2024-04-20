import BASE_URL from '@/config'
import { delivery_charge, seoData } from './const'

function generateTrackingNumber (length = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let trackingNumber = ''

  for (let i = 0; i < length; i++) {
    trackingNumber += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }

  return trackingNumber
}

function containsAdmin (url) {
  // Regular expression to check if the URL contains "/admin" anywhere in it
  var regex = /\/admin/i // The 'i' flag makes the regex case-insensitive

  // Test the URL against the regular expression
  return regex.test(url)
}

const calculateSubtotal = cartItems => {
  let subtotal = 0
  cartItems.forEach(item => {
    subtotal +=
      (item.product.price -
        item.product.price * (item.product.discount / 100)) *
      item.quantity
  })
  return subtotal
}

const getPrice = (price, discount = 0) => {
  price = price - price * (discount / 100)
  return Math.floor(price).toFixed(2)
}

const getDeliveryCharge = position => {
  return delivery_charge[position] ? delivery_charge[position] : 100
}

const getTime = timestamp => {
  const date = new Date(timestamp)

  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours()
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

  return formattedDate
}

const generateProductSeoData = productData => {
  const {
    name,
    metaDescription: description,
    slug,
    thumbnail: imageUrl
  } = productData

  const productSeoData = {
    title: `Quince Cloth - ${name}`,
    description: description,
    canonical: `${BASE_URL}/products/${slug}`,
    openGraph: {
      title: `Quince Cloth - ${name}`,
      description: description,
      url: `${BASE_URL}/products/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: name
        }
      ],
      type: 'product'
    },
    twitter: seoData.twitter
  }

  return productSeoData
}

export {
  generateTrackingNumber,
  containsAdmin,
  calculateSubtotal,
  getPrice,
  getDeliveryCharge,
  getTime,
  generateProductSeoData
}
