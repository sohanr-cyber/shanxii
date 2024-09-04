import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { isAuth } from '@/utility'
import BASE_URL from '@/config'
import { NextResponse } from 'next/server'

const handler = nc()

const store_id = process.env.store_id
const store_passwd = process.env.store_passwd
const is_live = process.env.is_live == 'false' ? false : true //true for live, false for sandbox

handler.post(async (req, res) => {
  try {
    console.log('--incomming req')
    console.log(req.body)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error })
  }
})

export default handler
