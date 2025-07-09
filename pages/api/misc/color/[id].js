// Import necessary modules and models
import db from '@/database/connection'
import Color from '@/database/model/Misc/Color'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'

const handler = nc()

// Get color by ID
handler.get(async (req, res) => {
    try {
        const { id } = req.query
        await db.connect()
        const color = await Color.findById(id)
        if (!color) {
            return res.status(404).json({ message: 'Color not found' })
        }
        res.status(200).json(color)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

handler.use(isAuth, isAdmin)
// Update color by ID
handler.put(async (req, res) => {
    console.log(req.body)

    try {
        const { id } = req.query
        await db.connect()
        const updatedColor = await Color.findByIdAndUpdate(
            id,
            { ...req.body, },
            {
                new: true
            }
        )
        if (!updatedColor) {
            return res.status(404).json({ message: 'Color not found' })
        }

        await db.disconnect()

        res.status(200).json(updatedColor)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

// Delete color by ID
handler.delete(async (req, res) => {
    try {
        const { id } = req.query
        await db.connect()
        const deletedColor = await Color.findByIdAndDelete(id)
        if (!deletedColor) {
            return res.status(404).json({ message: 'Color not found' })
        }
        await db.disconnect()
        return res.status(200).json({ message: 'Color deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})


export default handler
