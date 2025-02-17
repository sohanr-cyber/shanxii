// Import necessary modules and models
import db from '@/database/connection'
import Brand from '@/database/model/Brand'
import { isAdmin, isAuth } from '@/utility'
import nc from 'next-connect'
import slugify from 'slugify'

const handler = nc()

// Get brand by ID
handler.get(async (req, res) => {
    try {
        const { id } = req.query
        await db.connect()
        const brand = await Brand.findById(id)
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' })
        }
        res.status(200).json(brand)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

handler.use(isAuth, isAdmin)
// Update brand by ID
handler.put(async (req, res) => {
    console.log(req.body)

    try {
        const { id } = req.query
        await db.connect()
        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { ...req.body, slug: slugify(req.body.name) },
            {
                new: true
            }
        )
        if (!updatedBrand) {
            return res.status(404).json({ message: 'Brand not found' })
        }
     
        await db.disconnect()

        res.status(200).json(updatedBrand)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

// Delete brand by ID
handler.delete(async (req, res) => {
    try {
        const { id } = req.query
        await db.connect()
        const deletedBrand = await Brand.findByIdAndDelete(id)
        if (!deletedBrand) {
            return res.status(404).json({ message: 'Brand not found' })
        }
        await db.disconnect()
        return res.status(200).json({ message: 'Brand deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

// Add Child Brand
handler.post(async (req, res) => {
    try {
        const { name } = req.body


        // Create the child brand
        const newBrand = new Brand({ name, slug: slugify(name) })

        // Save the child brand
        await newBrand.save()



        res.status(201).json(newBrand)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

export default handler
