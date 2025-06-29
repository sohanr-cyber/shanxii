// Import necessary modules and models
import db from '@/database/connection'
import Brand from '@/database/model/Brand'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'
import fs from 'fs/promises'
import path from 'path'
import urlSlug from 'url-slug'

const handler = nc()

handler.get(async (req, res) => {
    try {
        // Path to your brand.json file
        const dataPath = path.join(process.cwd(), 'utility/brand.json')
        const jsonData = await fs.readFile(dataPath, 'utf8')
        const data = JSON.parse(jsonData)
        const brands = data.brands

        await db.connect()

        // Use Promise.all with Array.map to create brands concurrently.
        const bs = await Promise.all(
            brands.map(async (b) => {
                // Create each brand with a slugified name.
                const brand = await Brand.create({
                    name: b.name,
                    slug: urlSlug(b.name)
                })
                return brand
            })
        )

        await db.disconnect()
        res.status(201).json(bs)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error', error: error.toString() })
    }
})

export default handler
