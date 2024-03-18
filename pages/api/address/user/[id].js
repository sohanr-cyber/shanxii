// pages/api/addresses/index.js

import db from '@/database/connection'
import Address from '@/database/model/Address'
import nc from 'next-connect'

const handler = nc()

db.connect()

// Get all addresses by userId
handler.get(async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.query.id })
    res.status(200).json(addresses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
