import BASE_URL from '@/config'
const companyName = 'Quince'

const Inside_Dhaka = 70
const Outside_Dhaka = 145
const Dhaka_Subburb = 150

const delivery_charge = {
  'Inside Dhaka': 70,
  'Outside Dhaka': 145,
  'Dhaka Subburb': 150
}

const statusMessages = {
  pending: 'Your order is pending. We are processing it.',
  processing: 'Your order is being processed.',
  confirmed:
    'Your order has been confirmed and is now being prepared for packing.',
  packing: 'Your order is currently being packed.',
  packed: 'Your order has been packed and is ready for delivery.',
  delivering: 'Your order is out for delivery.',
  delivered: 'Your order has been delivered. Thank you for shopping with us!',
  canceled:
    'Your order has been canceled. If you have any questions, please contact customer support.',
  failed:
    'There was an issue processing your order. Please contact customer support for assistance.'
}
const support_number = '01744329811'
const support_mail = 'contactus@gmail.com'
const delivery_positions = ['Inside Dhaka', 'Outside Dhaka', 'Dhaka Subburb']

const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Gray', code: '#808080' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#008000' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Purple', code: '#800080' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Beige', code: '#F5F5DC' },
  { name: 'Navy', code: '#000080' },
  { name: 'Teal', code: '#008080' },
  { name: 'Maroon', code: '#800000' },
  { name: 'Olive', code: '#808000' },
  { name: 'Cyan', code: '#00FFFF' },
  { name: 'Magenta', code: '#FF00FF' },
  { name: 'Turquoise', code: '#40E0D0' },
  { name: 'Lime', code: '#00FF00' },
  { name: 'Indigo', code: '#4B0082' },
  { name: 'Violet', code: '#8A2BE2' },
  { name: 'Aqua', code: '#00FFFF' },
  { name: 'Silver', code: '#C0C0C0' },
  { name: 'Gold', code: '#FFD700' }
]

const seoData = {
  title: 'Quince Cloth - Your Ultimate Fashion Destination',
  description:
    'Discover the elegance of Quince Cloth, your ultimate fashion destination. Shop for chic dresses, cozy loungewear, and more.',
  canonical: BASE_URL,
  openGraph: {
    url: BASE_URL,
    title: 'Quince Cloth - Your Ultimate Fashion Destination',
    description:
      'Discover the elegance of Quince Cloth, your ultimate fashion destination. Shop for chic dresses, cozy loungewear, and more.',
    images: [
      {
        url: '/images/ecomerce.png',
        alt: 'Quince Cloth - Your Ultimate Fashion Destination',
        width: 1200,
        height: 630
      }
    ],
    site_name: 'Quince Cloth'
  },
  twitter: {
    handle: '@quincecloth',
    site: '@quincecloth',
    cardType: 'summary_large_image'
  }
}

const orderCartSeoData = {
  title: 'Your Order Cart - Quince Cloth',
  description: 'Review and manage items in your order cart at Quince Cloth.',
  canonical: `${BASE_URL}/cart`,
  openGraph: {
    title: 'Your Order Cart - Quince Cloth',
    description: 'Review and manage items in your order cart at Quince Cloth.',
    url: `${BASE_URL}/cart`,
    images: [
      {
        url: `${BASE_URL}/images/order-cart.png`,
        width: 1200,
        height: 630,
        alt: 'Order Cart - Quince Cloth'
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
}

const orderDetailSeoData = {
  title: `Order Details - ${companyName}`,
  description: `View the details of your order on ${companyName}. Check the products, quantities, and shipping information.`,
  canonical: `${BASE_URL}/order-detail`,
  openGraph: {
    title: `Order Details - ${companyName}`,
    description: `View the details of your order on ${companyName}. Check the products, quantities, and shipping information.`,
    url: `${BASE_URL}/order-detail`,
    images: [
      {
        url: `${BASE_URL}/images/order-detail.png`,
        width: 1200,
        height: 630,
        alt: `Order Details - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
}

const reviewSeoData = {
  title: `Review Order - ${companyName}`,
  description: `Review your order on ${companyName} before placing it. Confirm the products, quantities, and shipping details.`,
  canonical: `${BASE_URL}/review`,
  openGraph: {
    title: `Review Order - ${companyName}`,
    description: `Review your order on ${companyName} before placing it. Confirm the products, quantities, and shipping details.`,
    url: `${BASE_URL}/review`,
    images: [
      {
        url: `${BASE_URL}/images/review.png`,
        width: 800,
        height: 600,
        alt: `Review Order - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: {
    handle: '@yourtwitterhandle',
    site: '@yourtwitterhandle',
    cardType: 'summary_large_image'
  }
}

const addressSeoData = {
  title: `Address - ${companyName}`,
  description: `Enter your shipping address on ${companyName} to complete your order and receive your products.`,
  canonical: `${BASE_URL}/address`,
  openGraph: {
    title: `Address - ${companyName}`,
    description: `Enter your shipping address on ${companyName} to complete your order and receive your products.`,
    url: `${BASE_URL}/address`,
    images: [
      {
        url: `${BASE_URL}/images/address.png`,
        width: 1200,
        height: 630,
        alt: `Address - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: {
    handle: '@yourtwitterhandle',
    site: '@yourtwitterhandle',
    cardType: 'summary_large_image'
  }
}

const registerSeoData = {
  title: `Register - ${companyName}`,
  description: `Create an account on ${companyName} to start shopping for your favorite products.`,
  canonical: `${BASE_URL}/register`,
  openGraph: {
    title: `Register - ${companyName}`,
    description: `Create an account on ${companyName} to start shopping for your favorite products.`,
    url: `${BASE_URL}/register`,
    images: [
      {
        url: `${BASE_URL}/images/register.png`,
        width: 1200,
        height: 630,
        alt: `Register - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
}

const loginSeoData = {
  title: `Login - ${companyName}`,
  description: `Sign in to your ${companyName} account to access your profile and manage your orders.`,
  canonical: `${BASE_URL}/login`,
  openGraph: {
    title: `Login - ${companyName}`,
    description: `Sign in to your ${companyName} account to access your profile and manage your orders.`,
    url: `${BASE_URL}/login`,
    images: [
      {
        url: `${BASE_URL}/images/login.png`,
        width: 1200,
        height: 630,
        alt: 'Login - Quince Cloth'
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
}

// const themeBg = 'linear-gradient(45deg, rgb(8, 78, 67), rgb(9, 82, 71))'
// const themeTransparent = 'rgb(8, 78, 67,0.1)'
// const themeC = 'rgb(8, 78, 67)'
// const buttonC = 'white'
// const bg = 'aliceblue'
// const outerBg = 'lightgrey'

const themeBg =
  'linear-gradient(45deg, rgba(149, 145, 254, 255), rgba(7, 121, 214, 255))'
const themeTransparent = 'rgba(7, 121, 214,0.1)'
const themeC = 'rgba(7, 121, 214, 255)'
const buttonC = 'white'
const buttonBg =
  'linear-gradient(45deg, rgba(149, 145, 254, 255), rgba(7, 121, 214, 255))'
const bg = 'white'
const outerBg = 'rgb(232, 241, 247)'
const borderColor = 'rgba(197, 223, 244, 255)'

export {
  delivery_charge,
  delivery_positions,
  statusMessages,
  themeTransparent,
  themeBg,
  themeC,
  outerBg,
  bg,
  colors,
  buttonC,
  buttonBg,
  borderColor,
  seoData,
  orderCartSeoData,
  orderDetailSeoData,
  reviewSeoData,
  addressSeoData,
  registerSeoData,
  loginSeoData,
  companyName,
  support_mail,
  support_number
}
