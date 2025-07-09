import db from '@/database/connection'
import Product from '@/database/model/Product'
import { extractRGBA, universalSlugify } from '@/utility/helper'
import { ExtractColors } from '@/utility/image'
import { readdirSync } from 'fs'
import nc from 'next-connect'

const handler = nc()

// Update each product's imageColors
handler.put(async (req, res) => {
    try {
        await db.connect();

        // Retrieve all products
        const products = await Product.find();

        // Update each product's imageColors
        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                try {
                    // Extract colors and update the product
                    product.thumbnailColors = await ExtractColors(product.thumbnail);
                    await product.save(); // Save the updated product
                    return product; // Return the updated product
                } catch (error) {
                    console.error(`Error updating product ${product._id}:`, error);
                    throw error; // Propagate the error for handling
                }
            })
        );

        await db.disconnect();
        // Send the updated products as the response
        res.status(200).json({ updatedProducts });
    } catch (error) {
        console.error({ error });
        await db.disconnect(); // Ensure the database connection is closed
        res.status(500).json({ message: "Server Error" });
    }
});

// update each product ratings 0;
handler.get(async (req, res) => {
    try {
        await db.connect();

        // Retrieve all products
        const products = await Product.find();

        // Update each product's imageColors
        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                try {

                    product.totalRatings = 0
                    product.ratingCount = 0
                    product.ratings = 0
                    await product.save(); // Save the updated product
                    return product; // Return the updated product
                } catch (error) {
                    console.error(`Error updating product ${product._id}:`, error);
                    throw error; // Propagate the error for handling
                }
            })
        );

        await db.disconnect();
        // Send the updated products as the response
        res.status(200).json({ updatedProducts });
    } catch (error) {
        console.error({ error });
        await db.disconnect(); // Ensure the database connection is closed
        res.status(500).json({ message: "Server Error" });
    }
})

handler.post(async (req, res) => {
    try {
        const id = req.body._id
        await db.connect()

        const product = await Product.findOne({ _id: id }).lean()

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const variants = product.variants || []

        if (variants.length === 0) {
            return res.status(400).json({ message: 'No variants found in product' })
        }

        const firstColor = variants[0].color // original product color
        const allColors = variants.map(v => v.color)
        const uniqueColors = [...new Set(allColors)].filter(color => color !== firstColor)

        const clones = []

        for (const color of uniqueColors) {
            // Find the variant that matches the color
            const matchedVariant = variants.find(v => v.color === color)
            if (!matchedVariant) continue

            // Create a new ordered variant list, starting with the matched color
            const reorderedVariants = [
                matchedVariant,
                ...variants.filter(v => v.color !== color)
            ]

            const { _id, createdAt, updatedAt, ...productData } = product

            const newProduct = await Product.create({
                ...productData,
                thumbnail: matchedVariant.image,
                variants: reorderedVariants,
                slug: universalSlugify(productData.name)
            })

            clones.push(newProduct)
        }

        res.status(200).json({
            message: 'Products cloned by color successfully',
            count: clones.length,
            clones
        })

    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: 'Error cloning product', error: error.toString() })
    }
})



export default handler