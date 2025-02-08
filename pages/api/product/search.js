// pages/api/products/filter.js

import db from '@/database/connection'
import Product from '@/database/model/Product'
import Category from '@/database/model/Category'
import { ExtractColors, getPlaceholderImage } from '@/utility/image'
import nc from 'next-connect'
import filterProducts from '@/utility/fillter'

const handler = nc()

function sortArrayByKey(arr, key, order = 'asc') {
    if (!Array.isArray(arr) || arr.length === 0) {
        return []
    }

    // Determine if the key is numeric or date to handle sorting accordingly
    const isNumericKey = typeof arr[0][key] === 'number'
    const isDateKey =
        !isNumericKey &&
        new Date(arr[0][key]) !== 'Invalid Date' &&
        !isNaN(new Date(arr[0][key]))

    return arr.sort((a, b) => {
        let comparison = 0

        if (isNumericKey) {
            comparison = a[key] - b[key]
        } else if (isDateKey) {
            comparison = new Date(a[key]) - new Date(b[key])
        } else {
            if (a[key] < b[key]) comparison = -1
            if (a[key] > b[key]) comparison = 1
        }

        return order === 'desc' ? -comparison : comparison
    })
}



handler.get(async (req, res) => {
    try {


        await db.connect()

        // Query the database with the constructed filter object
        const products = await Product.find({}, {
            metaTitle: 0,
            images: 0,
            description: 0
        }).lean()
            .populate({
                path: 'categories',
                select: 'name',
            })
            .sort({ createdAt: -1 })



        return res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

export default handler
