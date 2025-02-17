// Import necessary modules and models
import db from '@/database/connection'
import Category from '@/database/model/Category'
import nc from 'next-connect'
import slugify from 'slugify'
const PAGE_SIZE = 20
const handler = nc()

// get all the category
handler.get(async (req, res) => {
    try {
        await db.connect()
        const collection = db.collection("Category"); // Change "users" to your collection name

        // Drop the unique index from the field (e.g., email)
        await collection.dropIndex({ name: 1,slug:1 });

        console.log("Unique index removed successfully.");    // const page = parseInt(req.query.page) || 1


        await db.disconnect()
        res.json(tree)
    } catch (error) {
        console.log({ error })
        res.status(500).json({ message: 'Server Error' })
    }
})

export default handler
