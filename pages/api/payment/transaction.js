import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import Product from '@/database/model/Product'
import Address from '@/database/model/Address'
import nc from 'next-connect'
import { generateTrackingNumber } from '@/utility/helper'
import { isAdmin, isAuth } from '@/utility'
import axios from 'axios'
import BASE_URL from '@/config'

const handler = nc()


const store_id = process.env.store_id
const store_passwd = process.env.store_passwd
const is_live = process.env.is_live == 'false' ? false : true //true for live, false for sandbox

handler.get(async (req, res) => {
  try {
    const data = {
      tran_id: req.query.tran_id
    }
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.transactionQueryByTransactionId(data).then(data => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#by-session-id
      console.log(data)
    })
    return
  } catch (error) {
    console.log(error)
  }
})

export default handler
