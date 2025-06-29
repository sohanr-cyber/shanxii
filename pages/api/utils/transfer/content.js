import db from '@/database/connection'
import { isAuth } from '@/utility'
import nextConnect from 'next-connect'
import axios from 'axios'
import Content from '@/database/model/Content'
const handler = nextConnect()


// handler.use(isAuth) // Optional: remove this if no auth required

handler.get(async (req, res) => {
    await db.connect() // ensure database connection

    try {
        const { data } = await axios.get("https://stylehive-kohl.vercel.app/api/content?pageSize=100")
        const contents = data.contents

        if (!contents || !Array.isArray(contents)) {
            return res.status(400).json({ error: "No valid contents received" })
        }


        // Save to DB
        const inserted = await Content.insertMany(contents)

        res.status(201).json({ message: "Contents copied successfully", count: inserted.length })
    } catch (error) {
        console.error("Error copying content:", error)
        res.status(500).json({ error: "Something went wrong" })
    }
})

export default handler
