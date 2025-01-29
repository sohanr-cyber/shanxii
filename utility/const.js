import BASE_URL from '@/config'
const companyName = 'DecoNest'

const footerP =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu erat in eros varius congue vitae ut mauris. Nunc sit amet justo vitae enim rutrum consectetur. Morbi id pretium risus. Donec gravida porta tellus, non iaculis purus ornare ac. Donec sagittis, nulla nec placerat efficitur, velit enim malesuada felis'
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
const feacebook_page = 'https://www.facebook.com/'
const messenger = 'https://www.facebook.com/'
const whatsapp = 'https://web.whatsapp.com/'
const instagram = 'https://www.instagram.com/'


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
  title: `${companyName} - Elevate Your Living Space with Elegant Home Decor`,
  description:
    'Explore a stunning collection of home decor items to transform your space. Shop stylish furniture, wall art, lighting, and more at DecoNest.',
  canonical: BASE_URL,
  openGraph: {
    url: BASE_URL,
    title: `${companyName} - Elevate Your Living Space with Elegant Home Decor`,
    description:
      'Discover premium home decor pieces to enhance your interiors. Shop furniture, lighting, and accessories at DecoNest.',
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        alt: `${companyName} Home Decor`,
        width: 1200,
        height: 630
      }
    ],
    site_name: companyName
  },
  twitter: {
    handle: `@${companyName}`,
    site: `@${companyName}`,
    cardType: 'summary_large_image'
  }
};

const orderCartSeoData = {
  title: `Your Cart - ${companyName}`,
  description: `Review and manage the items in your cart at ${companyName}.`,
  canonical: `${BASE_URL}/cart`,
  openGraph: {
    title: `Your Cart - ${companyName}`,
    description: `Review and manage the items in your cart at ${companyName}.`,
    url: `${BASE_URL}/cart`,
    images: [
      {
        url: `${BASE_URL}/images/cart.png`,
        width: 1200,
        height: 630,
        alt: `Your Cart - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};

const TermsAndConditionSeoData = {
  title: `Terms and Conditions - ${companyName}`,
  description: `Review the terms and conditions for using ${companyName}.`,
  canonical: `${BASE_URL}/terms-and-conditions`,
  openGraph: {
    title: `Terms and Conditions - ${companyName}`,
    description: `Review the terms and conditions for using ${companyName}.`,
    url: `${BASE_URL}/terms-and-conditions`,
    images: [
      {
        url: `${BASE_URL}/images/terms-and-conditions.png`,
        width: 1200,
        height: 630,
        alt: `Terms and Conditions - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};

const privacyPolicySeoData = {
  title: `Privacy Policy - ${companyName}`,
  description: `Understand how ${companyName} protects your data and privacy.`,
  canonical: `${BASE_URL}/privacy-policy`,
  openGraph: {
    title: `Privacy Policy - ${companyName}`,
    description: `Understand how ${companyName} protects your data and privacy.`,
    url: `${BASE_URL}/privacy-policy`,
    images: [
      {
        url: `${BASE_URL}/images/privacy-policy.png`,
        width: 1200,
        height: 630,
        alt: `Privacy Policy - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};


const orderDetailSeoData = {
  title: `Order Details - ${companyName}`,
  description: `Check the details of your order at ${companyName}.`,
  canonical: `${BASE_URL}/order-details`,
  openGraph: {
    title: `Order Details - ${companyName}`,
    description: `Check the details of your order at ${companyName}.`,
    url: `${BASE_URL}/order-details`,
    images: [
      {
        url: `${BASE_URL}/images/order-details.png`,
        width: 1200,
        height: 630,
        alt: `Order Details - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};

const reviewSeoData = {
  title: `Review Your Order - ${companyName}`,
  description: `Confirm your items and details before placing your order at ${companyName}.`,
  canonical: `${BASE_URL}/review`,
  openGraph: {
    title: `Review Your Order - ${companyName}`,
    description: `Confirm your items and details before placing your order at ${companyName}.`,
    url: `${BASE_URL}/review`,
    images: [
      {
        url: `${BASE_URL}/images/review-order.png`,
        width: 1200,
        height: 630,
        alt: `Review Your Order - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};

const addressSeoData = {
  title: `Shipping Address - ${companyName}`,
  description: `Enter your shipping address to complete your purchase on ${companyName}.`,
  canonical: `${BASE_URL}/address`,
  openGraph: {
    title: `Shipping Address - ${companyName}`,
    description: `Enter your shipping address to complete your purchase on ${companyName}.`,
    url: `${BASE_URL}/address`,
    images: [
      {
        url: `${BASE_URL}/images/shipping-address.png`,
        width: 1200,
        height: 630,
        alt: `Shipping Address - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};

const loginSeoData = {
  title: `Login - ${companyName}`,
  description: `Log in to your account at ${companyName} to access your profile and orders.`,
  canonical: `${BASE_URL}/login`,
  openGraph: {
    title: `Login - ${companyName}`,
    description: `Log in to your account at ${companyName} to access your profile and orders.`,
    url: `${BASE_URL}/login`,
    images: [
      {
        url: `${BASE_URL}/images/login.png`,
        width: 1200,
        height: 630,
        alt: `Login - ${companyName}`
      }
    ],
    type: 'website'
  },
  twitter: seoData.twitter
};

const registerSeoData = {
  title: `Register - ${companyName}`,
  description: `Create an account at ${companyName} to start shopping for electronics and gadgets.`,
  canonical: `${BASE_URL}/register`,
  openGraph: {
    title: `Register - ${companyName}`,
    description: `Create an account at ${companyName} to start shopping for electronics and gadgets.`,
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
};


// const themeBg = 'linear-gradient(45deg, rgb(8, 78, 67), rgb(9, 82, 71))'
// const themeTransparent = 'rgb(8, 78, 67,0.1)'
// const themeC = 'rgb(8, 78, 67)'
// const buttonC = 'white'
// const bg = 'aliceblue'
// const outerBg = 'lightgrey'
// const buttonBg = 'linear-gradient(45deg, rgb(8, 78, 67), rgb(9, 82, 71))'
// const borderColor = 'rgb(8, 78, 67,0.1)'

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

// const themeBg = 'linear-gradient(45deg, rgb(29, 102, 12), rgb(137, 208, 5))'
// const themeTransparent = 'rgba(7, 121, 214,0.1)'
// const themeC = 'rgb(29, 102, 12)'
// const buttonC = 'white'
// const buttonBg = 'linear-gradient(45deg, rgb(29, 102, 12), rgb(137, 208, 5))'
// const bg = 'white'
// const outerBg = 'rgb(232, 241, 247)'
// const borderColor = 'rgba(52, 134, 11, 0.5)'

const orderStatusColors = {
  pending: 'rgb(255, 165, 0)', // Orange
  processing: 'rgb(0, 0, 255)', // Blue
  confirmed: 'rgb(0, 128, 0)', // Green
  completed: 'rgb(0, 128, 0)', // Green
  packing: 'rgb(255, 215, 0)', // Gold
  packed: 'rgb(255, 140, 0)', // Dark Orange
  delivering: 'rgb(30, 144, 255)', // Dodger Blue
  delivered: 'rgb(50, 205, 50)', // Lime Green
  canceled: 'rgb(255, 0, 0)', // Red
  failed: 'rgb(139, 0, 0)', // Dark Red
  none: `${themeC}`
}

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
  TermsAndConditionSeoData,
  privacyPolicySeoData,
  addressSeoData,
  registerSeoData,
  loginSeoData,
  companyName,
  support_mail,
  support_number,
  orderStatusColors,
  feacebook_page,
  whatsapp,
  messenger,
  instagram,
  footerP
}
