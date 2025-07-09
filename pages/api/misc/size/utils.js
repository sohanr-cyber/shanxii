// Import necessary modules and models
import db from '@/database/connection'
import Size from '@/database/model/Misc/Size'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'
import fs from 'fs/promises'
import path from 'path'
import urlSlug from 'url-slug'

const handler = nc()

handler.get(async (req, res) => {
    try {
        // Path to your size.json file
        const dataPath = path.join(process.cwd(), 'utility/size.json')
        const jsonData = await fs.readFile(dataPath, 'utf8')
        const data = JSON.parse(jsonData)
        const sizes = data.sizes || data // In case it's just an array without `sizes` key

        await db.connect()

        const results = await Promise.all(
            sizes.map(async (sizeObj) => {
                // Check if the size with the same name already exists (case-insensitive)
                const exists = await Size.findOne({ name: new RegExp(`^${sizeObj.name}$`, 'i'), category: sizeObj.category })

                if (!exists) {
                    const newSize = await Size.create({
                        ...sizeObj
                    })
                    return newSize
                } else {
                    return null // Skip insertion
                }
            })
        )

        await db.disconnect()

        // Filter out skipped sizes
        const insertedSizes = results.filter(Boolean)

        res.status(201).json({
            insertedCount: insertedSizes.length,
            insertedSizes
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error', error: error.toString() })
    }
})

export default handler
