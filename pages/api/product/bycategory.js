import db from '@/database/connection'
import Category from '@/database/model/Category'
import Product from '@/database/model/Product'
import nc from 'next-connect'
// import { ExtractColors, getPlaceholderImage } from '@/utility/image'

const handler = nc()

const fetchLatestProducts = async () => {
  let latestProducts = await Product.find({})
    .sort({ createdAt: -1 }).populate('categories', 'name')
    .limit(4).lean()



  return latestProducts
}



const fetchFeaturedProducts = async () => {
  let featuredProducts = await Product.find({ featured: true })
    .sort({ createdAt: -1 }).populate('categories', 'name')
    .limit(4).lean()


  return featuredProducts
}
const fetchTopSellingProducts = async () => {
  let topSellingProducts = await Product.find({})
    .sort({ sold: -1 }).populate('categories', 'name')
    .limit(4).lean()


  return topSellingProducts
}


const fetchFeaturedCategories = async lang => {
  const categories = await Category.find({ isFeatured: true }).sort({
    updatedAt: -1
  })
  return Promise.all(
    categories.map(async category => {
      let products = await Product.find({
        categories: { $in: category._id },

      })
        .sort({ publishedAt: -1 })
        .populate('categories', 'name')
        .limit(10).lean()

      const subCategories = await Category.find({
        parent: category._id
      }).select('_id name').lean()

      return {
        category: category.name,
        _id: category._id,
        subCategories,
        updatedAt: category.updatedAt,
        products
      }
    })
  )
}

const getPaginatedCategoryProducts = async (page = 1, limit = 18) => {

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Get all categories
  // const categories = await Category.find();
  // if (!categories.length) {
  //   return { products: [], page: pageNumber, limit: limitNumber, total: 0 };
  // }

  // Retrieve at least one product per category with pagination
  // const products = await Promise.all(
  //   categories.map(async (category) => {
  //     const product = await Product.findOne({ categories: category._id })
  //       .sort({ createdAt: -1 }) // Fetch the latest product from each category
  //       .skip((pageNumber - 1) * limitNumber)
  //       .limit(limitNumber)
  //       .lean();
  //     return product;
  //   })
  // );

  const products = await Product.find({})
    .sort({ createdAt: -1 }) // Fetch the latest product from each category
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)
    .lean();
  // Filter out null values (if any category has no product)
  const filteredProducts = products.filter(Boolean);

  return {
    products: filteredProducts,
    page: pageNumber,
    limit: limitNumber,
    total: filteredProducts.length,
  };
}


handler.get(async (req, res) => {
  try {
    await db.connect()

    const [featuredCategories, latest, topSelling, featured, paginatedCategoryProducts] =
      await Promise.all([
        fetchFeaturedCategories(),
        fetchLatestProducts(),
        fetchTopSellingProducts(),
        fetchFeaturedProducts(),
        getPaginatedCategoryProducts()
      ])


    await db.disconnect()
    return res
      .status(200)
      .json([
        {
          category: "Just For You", products: paginatedCategoryProducts.products
        },
        ...featuredCategories,
        { category: "Recommended", products: featured },
        { category: "Top Selling", products: topSelling },
        { category: "New Arival", products: latest },

      ])
  } catch (error) {
    console.error('Error fetching featured categories:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default handler
