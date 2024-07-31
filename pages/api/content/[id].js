// Import necessary modules and models
import db from '@/database/connection'
import Content from '@/database/model/Content'
import nc from 'next-connect'
import slugify from 'slugify'

const handler = nc()

// Get content by ID
handler.get(async (req, res) => {
  try {
    const { id } = req.query
    await db.connect()
    const content = await Content.findById(id)
    if (!content) {
      return res.status(404).json({ message: 'Content not found' })
    }
    res.status(200).json(content)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Update content by ID
handler.put(async (req, res) => {
  console.log(req.body)

  try {
    const { id } = req.query
    await db.connect()
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true
      }
    )
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' })
    }
    const content = await Content.findById(id)

    await db.disconnect()

    res.status(200).json(content)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Delete content by ID
handler.delete(async (req, res) => {
  try {
    const { id } = req.query
    await db.connect()
    const deletedContent = await Content.findByIdAndDelete(id)
    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' })
    }
    await db.disconnect()
    return res.status(200).json({ message: 'Content deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})



export default handler
