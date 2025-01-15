import db from '@/database/connection'
import Product from '@/database/model/Product'
import { extractRGBA } from '@/utility/helper'
import { ExtractColors } from '@/utility/image'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
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


export default handler