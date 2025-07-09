// Import necessary modules and models
import db from '@/database/connection'
import Color from '@/database/model/Misc/Color'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'
import fs from 'fs/promises'
import path from 'path'
import urlSlug from 'url-slug'

const handler = nc()

handler.get(async (req, res) => {
    try {
        // Path to your color.json file
        const dataPath = path.join(process.cwd(), 'utility/color.json')
        const jsonData = await fs.readFile(dataPath, 'utf8')
        const data = JSON.parse(jsonData)
        const colors = data.colors || data // In case it's just an array without `colors` key

        await db.connect()

        const results = await Promise.all(
            colors.map(async (colorObj) => {
                // Check if the color with the same name already exists (case-insensitive)
                const exists = await Color.findOne({ name: new RegExp(`^${colorObj.name}$`, 'i') })

                if (!exists) {
                    const newColor = await Color.create({
                        ...colorObj
                    })
                    return newColor
                } else {
                    return null // Skip insertion
                }
            })
        )

        await db.disconnect()

        // Filter out skipped colors
        const insertedColors = results.filter(Boolean)

        res.status(201).json({
            insertedCount: insertedColors.length,
            insertedColors
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error', error: error.toString() })
    }
})

export default handler
