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

const sellerNumber = '01744329811'
const delivery_positions = ['Inside Dhaka', 'Outside Dhaka', 'Dhaka Subburb']
const themeBg = 'linear-gradient(45deg, rgb(8, 78, 67), rgb(9, 82, 71))'
const themeTransparent = 'rgb(8, 78, 67,0.1)'
const themeC = 'rgb(8, 78, 67)'
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
  canonical: 'https://www.quincecloth.com',
  openGraph: {
    url: 'https://www.quincecloth.com',
    title: 'Quince Cloth - Your Ultimate Fashion Destination',
    description:
      'Discover the elegance of Quince Cloth, your ultimate fashion destination. Shop for chic dresses, cozy loungewear, and more.',
    images: [
      {
        url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Flms-926e5.appspot.com%2Fo%2Fdivision%252FDesigner%2520(4).jpeg%3Falt%3Dmedia%26token%3D8b203c50-bd41-4525-a62d-5e39d83f86da&w=828&q=75',
        alt: 'Quince Cloth - Your Ultimate Fashion Destination'
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

export {
  delivery_charge,
  delivery_positions,
  statusMessages,
  sellerNumber,
  themeTransparent,
  themeBg,
  themeC,
  colors,
  seoData
}
