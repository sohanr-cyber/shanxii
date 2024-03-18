// pages/api/addresses/[id].js

import db from '@/database/connection'
import Address from '@/database/model/Address'
import nc from 'next-connect'

const handler = nc()

db.connect()

// Get a single address by ID
handler.get(async (req, res) => {
  try {
    const { id } = req.query
    const address = await Address.findById(id)
    if (!address) {
      return res.status(404).json({ message: 'Address not found' })
    }
    res.status(200).json(address)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Update an address by ID
handler.put(async (req, res) => {
  try {
    const { id } = req.query
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' })
    }
    res.status(200).json(updatedAddress)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Delete an address by ID
handler.delete(async (req, res) => {
  try {
    const { id } = req.query
    const deletedAddress = await Address.findByIdAndDelete(id)
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' })
    }
    res.status(200).json({ message: 'Address deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
