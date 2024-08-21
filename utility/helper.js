import BASE_URL from '@/config'
import { companyName, delivery_charge, seoData } from './const'
import mongoose from 'mongoose'

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
  cartItems?.forEach(item => {
    subtotal +=
      (item.product?.price -
        item.product?.price * (item.product?.discount / 100)) *
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
    title: `${companyName} - ${name}`,
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
function chunkArray (array, chunkSize) {
  // Initialize an empty array to hold the chunks
  let result = []

  // Loop through the input array in steps of chunkSize
  for (let i = 0; i < array.length; i += chunkSize) {
    // Use the slice method to create a chunk and push it to the result array
    result.push(array.slice(i, i + chunkSize))
  }

  return result
}

function generateVerificationCode (length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code
}

function verifyCode (enteredCode, generatedCode) {
  return enteredCode === generatedCode
}

function generateUniqueID (existingIDs) {
  let number
  do {
    // Generate a random 6-digit number
    number = Math.floor(100000 + Math.random() * 900000)
  } while (existingIDs.includes(number)) // Check if the number is already in use

  // Add the new ID to the existing list
  existingIDs.push(number)

  return number
}

function orderToGraph (inputData) {
  const result = []

  for (const [date, values] of Object.entries(inputData)) {
    const total = values.total || 0
    const pending = (values.pending || 0) + (values.Pending || 0)
    const processing = values.Processing || 0
    const canceled = values.Canceled || 0
    const failed = values.Failed || 0
    const delivered = values.Delivered || 0
    const packing = values.Packing || 0

    result.push({
      date: date,
      total: total,
      pending: pending,
      processing: processing,
      canceled: canceled,
      failed: failed,
      delivered: delivered,
      packing: packing,
      red: failed + canceled
    })
  }
  return result
}

const sortByMonth = data => {
  return data.sort((a, b) => new Date(a.month) - new Date(b.month))
}

function extractRGBA (rgbString, opacity = 1) {
  // Match the numbers inside the parentheses
  const result = rgbString.match(/\d+/g)

  if (result && result.length === 3) {
    // Parse the strings to integers
    const [r, g, b] = result.map(Number)
    // Return the values in rgba() format as a string
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  } else {
    // Return null if the format is incorrect
    return null
  }
}

const getTotalProfit = arr => {
  let total = 0
  arr.forEach(i => {
    total += i.revenue
  })
  return total.toFixed(0)
}

export {
  generateTrackingNumber,
  containsAdmin,
  calculateSubtotal,
  getPrice,
  getDeliveryCharge,
  getTime,
  generateProductSeoData,
  generateUniqueID,
  generateVerificationCode,
  chunkArray,
  orderToGraph,
  getTotalProfit,
  sortByMonth,
  extractRGBA
}
