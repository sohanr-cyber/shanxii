// pages/api/addresses/index.js

import db from "@/database/connection";
import Address from "@/database/model/Address";
import nc from 'next-connect';



const handler = nc();

db.connect();

// Create a new address
handler.post(async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all addresses
handler.get(async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default handler;
