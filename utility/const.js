import BASE_URL from '@/config'

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

// const companyName = 'StyleHive '

// const seoData = {
//   title: `${companyName} - Trendy, Stylish, and Affordable Fashion`,
//   description:
//     'Discover the latest fashion trends with high-quality clothing and accessories. Shop stylish outfits at great prices only at FashionNest.',
//   canonical: BASE_URL,
//   openGraph: {
//     url: BASE_URL,
//     title: `${companyName} - Trendy, Stylish, and Affordable Fashion`,
//     description:
//       'Explore the newest fashion trends and timeless styles. Shop clothing, footwear, and accessories for men, women, and kids at FashionNest.',
//     images: [
//       {
//         url: `${BASE_URL}/images/og-image.jpg`,
//         alt: `${companyName} Fashion Store`,
//         width: 1200,
//         height: 630
//       }
//     ],
//     site_name: companyName
//   },
//   twitter: {
//     handle: `@${companyName}`,
//     site: `@${companyName}`,
//     cardType: 'summary_large_image'
//   }
// };

// const orderCartSeoData = {
//   title: `Your Shopping Cart - ${companyName}`,
//   description: `Review and manage the stylish outfits in your cart at ${companyName}.`,
//   canonical: `${BASE_URL}/cart`,
//   openGraph: {
//     title: `Your Shopping Cart - ${companyName}`,
//     description: `Review and manage the stylish outfits in your cart at ${companyName}.`,
//     url: `${BASE_URL}/cart`,
//     images: [
//       {
//         url: `${BASE_URL}/images/cart.png`,
//         width: 1200,
//         height: 630,
//         alt: `Your Shopping Cart - ${companyName}`
//       }
//     ],
//     type: 'website'
//   },
//   twitter: seoData.twitter
// };

// const TermsAndConditionSeoData = {
//   title: `Terms and Conditions - ${companyName}`,
//   description: `Review the terms and conditions for shopping at ${companyName}.`,
//   canonical: `${BASE_URL}/terms-and-conditions`,
//   openGraph: {
//     title: `Terms and Conditions - ${companyName}`,
//     description: `Review the terms and conditions for shopping at ${companyName}.`,
//     url: `${BASE_URL}/terms-and-conditions`,
//     images: [
//       {
//         url: `${BASE_URL}/images/terms-and-conditions.png`,
//         width: 1200,
//         height: 630,
//         alt: `Terms and Conditions - ${companyName}`
//       }
//     ],
//     type: 'website'
//   },
//   twitter: seoData.twitter
// };

// const privacyPolicySeoData = {
//   title: `Privacy Policy - ${companyName}`,
//   description: `Understand how ${companyName} protects your personal data and privacy while shopping.`,
//   canonical: `${BASE_URL}/privacy-policy`,
//   openGraph: {
//     title: `Privacy Policy - ${companyName}`,
//     description: `Understand how ${companyName} protects your personal data and privacy while shopping.`,
//     url: `${BASE_URL}/privacy-policy`,
//     images: [
//       {
//         url: `${BASE_URL}/images/privacy-policy.png`,
//         width: 1200,
//         height: 630,
//         alt: `Privacy Policy - ${companyName}`
//       }
//     ],
//     type: 'website'
//   },
//   twitter: seoData.twitter
// };


// const companyName = "AgroFresh";

// const seoData = {
//   title: `${companyName} - Fresh, Organic, and Healthy Produce`,
//   description:
//     "Buy the freshest organic fruits, vegetables, and farm produce directly from AgroFresh. We ensure quality and natural goodness in every product.",
//   canonical: BASE_URL,
//   openGraph: {
//     url: BASE_URL,
//     title: `${companyName} - Fresh, Organic, and Healthy Produce`,
//     description:
//       "Discover organic and farm-fresh products at AgroFresh. We bring you healthy and chemical-free food straight from trusted farmers.",
//     images: [
//       {
//         url: `${BASE_URL}/images/og-image.jpg`,
//         alt: `${companyName} - Fresh Organic Produce`,
//         width: 1200,
//         height: 630
//       }
//     ],
//     site_name: companyName
//   },
//   twitter: {
//     handle: `@${companyName}`,
//     site: `@${companyName}`,
//     cardType: "summary_large_image"
//   }
// };

// const orderCartSeoData = {
//   title: `Your Shopping Cart - ${companyName}`,
//   description: `Review and manage your fresh organic produce orders at ${companyName}.`,
//   canonical: `${BASE_URL}/cart`,
//   openGraph: {
//     title: `Your Shopping Cart - ${companyName}`,
//     description: `Review and manage your fresh organic produce orders at ${companyName}.`,
//     url: `${BASE_URL}/cart`,
//     images: [
//       {
//         url: `${BASE_URL}/images/cart.png`,
//         width: 1200,
//         height: 630,
//         alt: `Your Shopping Cart - ${companyName}`
//       }
//     ],
//     type: "website"
//   },
//   twitter: seoData.twitter
// };

// const TermsAndConditionSeoData = {
//   title: `Terms and Conditions - ${companyName}`,
//   description: `Review the terms and conditions for ordering fresh and organic produce from ${companyName}.`,
//   canonical: `${BASE_URL}/terms-and-conditions`,
//   openGraph: {
//     title: `Terms and Conditions - ${companyName}`,
//     description: `Review the terms and conditions for ordering fresh and organic produce from ${companyName}.`,
//     url: `${BASE_URL}/terms-and-conditions`,
//     images: [
//       {
//         url: `${BASE_URL}/images/terms-and-conditions.png`,
//         width: 1200,
//         height: 630,
//         alt: `Terms and Conditions - ${companyName}`
//       }
//     ],
//     type: "website"
//   },
//   twitter: seoData.twitter
// };

// const privacyPolicySeoData = {
//   title: `Privacy Policy - ${companyName}`,
//   description: `Learn how ${companyName} protects your personal information while you shop for organic produce.`,
//   canonical: `${BASE_URL}/privacy-policy`,
//   openGraph: {
//     title: `Privacy Policy - ${companyName}`,
//     description: `Learn how ${companyName} protects your personal information while you shop for organic produce.`,
//     url: `${BASE_URL}/privacy-policy`,
//     images: [
//       {
//         url: `${BASE_URL}/images/privacy-policy.png`,
//         width: 1200,
//         height: 630,
//         alt: `Privacy Policy - ${companyName}`
//       }
//     ],
//     type: "website"
//   },
//   twitter: seoData.twitter
// };



// const companyName = "ElectroHub";
// const seoData = {
//   title: `${companyName} - Latest Electronics, Gadgets & Accessories`,
//   description:
//     "Shop the newest electronics, smart gadgets, and accessories at ElectroHub. Get high-quality tech products at unbeatable prices.",
//   canonical: BASE_URL,
//   openGraph: {
//     url: BASE_URL,
//     title: `${companyName} - Latest Electronics, Gadgets & Accessories`,
//     description:
//       "Find cutting-edge electronics, mobile accessories, smart devices, and more at ElectroHub. Your one-stop tech store for the best deals.",
//     images: [
//       {
//         url: `${BASE_URL}/images/og-image.jpg`,
//         alt: `${companyName} - Electronics & Gadgets Store`,
//         width: 1200,
//         height: 630
//       }
//     ],
//     site_name: companyName
//   },
//   twitter: {
//     handle: `@${companyName}`,
//     site: `@${companyName}`,
//     cardType: "summary_large_image"
//   }
// };

// const orderCartSeoData = {
//   title: `Your Shopping Cart - ${companyName}`,
//   description: `Review and manage the electronics and gadgets in your cart at ${companyName}.`,
//   canonical: `${BASE_URL}/cart`,
//   openGraph: {
//     title: `Your Shopping Cart - ${companyName}`,
//     description: `Review and manage the electronics and gadgets in your cart at ${companyName}.`,
//     url: `${BASE_URL}/cart`,
//     images: [
//       {
//         url: `${BASE_URL}/images/cart.png`,
//         width: 1200,
//         height: 630,
//         alt: `Your Shopping Cart - ${companyName}`
//       }
//     ],
//     type: "website"
//   },
//   twitter: seoData.twitter
// };

// const TermsAndConditionSeoData = {
//   title: `Terms and Conditions - ${companyName}`,
//   description: `Review the terms and conditions for shopping at ${companyName}.`,
//   canonical: `${BASE_URL}/terms-and-conditions`,
//   openGraph: {
//     title: `Terms and Conditions - ${companyName}`,
//     description: `Review the terms and conditions for shopping at ${companyName}.`,
//     url: `${BASE_URL}/terms-and-conditions`,
//     images: [
//       {
//         url: `${BASE_URL}/images/terms-and-conditions.png`,
//         width: 1200,
//         height: 630,
//         alt: `Terms and Conditions - ${companyName}`
//       }
//     ],
//     type: "website"
//   },
//   twitter: seoData.twitter
// };

// const privacyPolicySeoData = {
//   title: `Privacy Policy - ${companyName}`,
//   description: `Learn how ${companyName} protects your personal data while shopping for electronics and gadgets.`,
//   canonical: `${BASE_URL}/privacy-policy`,
//   openGraph: {
//     title: `Privacy Policy - ${companyName}`,
//     description: `Learn how ${companyName} protects your personal data while shopping for electronics and gadgets.`,
//     url: `${BASE_URL}/privacy-policy`,
//     images: [
//       {
//         url: `${BASE_URL}/images/privacy-policy.png`,
//         width: 1200,
//         height: 630,
//         alt: `Privacy Policy - ${companyName}`
//       }
//     ],
//     type: "website"
//   },
//   twitter: seoData.twitter
// };



const companyName = "Shanxii";

const seoData = {
  title: `${companyName} - Elegant Home Decor & Stylish Interiors`,
  description:
    "Transform your living space with DecoNest. Shop premium home decor, furniture, and interior design essentials to create a cozy and stylish home.",
  canonical: BASE_URL,
  openGraph: {
    url: BASE_URL,
    title: `${companyName} - Elegant Home Decor & Stylish Interiors`,
    description:
      "Discover beautiful home decor, furniture, lighting, and accessories at DecoNest. Elevate your interiors with our handpicked collection.",
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        alt: `${companyName} - Home Decor & Interiors`,
        width: 1200,
        height: 630
      }
    ],
    site_name: companyName
  },
  twitter: {
    handle: `@${companyName}`,
    site: `@${companyName}`,
    cardType: "summary_large_image"
  }
};

const orderCartSeoData = {
  title: `Your Shopping Cart - ${companyName}`,
  description: `Review and manage the home decor and furniture in your cart at ${companyName}.`,
  canonical: `${BASE_URL}/cart`,
  openGraph: {
    title: `Your Shopping Cart - ${companyName}`,
    description: `Review and manage the home decor and furniture in your cart at ${companyName}.`,
    url: `${BASE_URL}/cart`,
    images: [
      {
        url: `${BASE_URL}/images/cart.png`,
        width: 1200,
        height: 630,
        alt: `Your Shopping Cart - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const TermsAndConditionSeoData = {
  title: `Terms and Conditions - ${companyName}`,
  description: `Review the terms and conditions for shopping at ${companyName}.`,
  canonical: `${BASE_URL}/terms-and-conditions`,
  openGraph: {
    title: `Terms and Conditions - ${companyName}`,
    description: `Review the terms and conditions for shopping at ${companyName}.`,
    url: `${BASE_URL}/terms-and-conditions`,
    images: [
      {
        url: `${BASE_URL}/images/terms-and-conditions.png`,
        width: 1200,
        height: 630,
        alt: `Terms and Conditions - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const privacyPolicySeoData = {
  title: `Privacy Policy - ${companyName}`,
  description: `Learn how ${companyName} protects your personal data while shopping for home decor and furniture.`,
  canonical: `${BASE_URL}/privacy-policy`,
  openGraph: {
    title: `Privacy Policy - ${companyName}`,
    description: `Learn how ${companyName} protects your personal data while shopping for home decor and furniture.`,
    url: `${BASE_URL}/privacy-policy`,
    images: [
      {
        url: `${BASE_URL}/images/privacy-policy.png`,
        width: 1200,
        height: 630,
        alt: `Privacy Policy - ${companyName}`
      }
    ],
    type: "website"
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

const base64Img = "/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAApACkDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAEDBAX/xAAnEAACAgECBQQDAQAAAAAAAAABAgADEQQhEiIxQXETQlFhMjPB0f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABERJB/9oADAMBAAIRAxEAPwDYiJA6mB6SjqrmWwIpzY34jpj6lk1m3F7jX5EMg95ii2zhsdnwUwyHHKRnEtUX5uFTMSwbGRuAf8MvKdX1oxQHSEjYmRrX9DVKxBbBzg+4HYibB6SjrG01pNdythT+we1viJcZsZgrDW8KOWrIAXA5j9Y/vST0o1rqhPpVBtlQ9vPmStTWlhr9dK1bYhU4c+TLGlbToVCWBrXHcYz9AdhLpYuDpCOKRTkFmkqscOy83ffY+ZPCBANLQFI4MgjfJO/mNNNUjq6rzKMAk5k0IAIo4QP/2Q=="

// const themeBg = 'linear-gradient(45deg, rgb(8, 78, 67), rgb(9, 82, 71))'
// const themeTransparent = 'rgb(8, 78, 67,0.1)'
// const themeC = 'rgb(8, 78, 67)'
// const buttonC = 'white'
// const bg = 'aliceblue'
// const outerBg = 'lightgrey'
// const buttonBg = 'linear-gradient(45deg, rgb(8, 78, 67), rgb(9, 82, 71))'
// const borderColor = 'rgb(8, 78, 67,0.1)'

// const themeBg =
//   'linear-gradient(45deg, rgba(149, 145, 254, 255), rgba(7, 121, 214, 255))'
// const themeTransparent = 'rgba(7, 121, 214,0.1)'
// const themeC = 'rgba(7, 121, 214, 255)'
// const buttonC = 'white'
// const buttonBg =
//   'linear-gradient(45deg, rgba(149, 145, 254, 255), rgba(7, 121, 214, 255))'
// const bg = 'white'
// const outerBg = 'rgb(232, 241, 247)'
// const borderColor = 'rgba(197, 223, 244, 255)'

// const themeBg = 'linear-gradient(45deg, rgb(29, 102, 12), rgb(137, 208, 5))'
// const themeTransparent = 'rgba(7, 121, 214,0.1)'
// const themeC = 'rgb(29, 102, 12)'
// const buttonC = 'white'
// const buttonBg = 'linear-gradient(45deg, rgb(29, 102, 12), rgb(137, 208, 5))'
// const bg = 'white'
// const outerBg = 'rgb(232, 241, 247)'
// const borderColor = 'rgba(52, 134, 11, 0.5)'


const themeBg = 'linear-gradient(45deg, rgb(0, 0, 0), rgb(14, 14, 14))'
const themeTransparent = 'rgba(41, 43, 44, 0.1)'
const themeC = 'rgb(0, 0, 0)'
const buttonC = 'white'
const buttonBg = 'linear-gradient(45deg, rgb(0, 0, 0), rgb(0, 0, 0))'
const bg = 'white'
const outerBg = 'rgb(232, 241, 247)'
const borderColor = 'rgba(69, 69, 68, 0.5)'


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
  base64Img,
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
