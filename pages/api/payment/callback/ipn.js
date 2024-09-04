import SSLCommerzPayment from 'sslcommerz-lts'
import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'
import { isAuth } from '@/utility'
import BASE_URL from '@/config'
import Payment from '@/database/model/Payment'

const handler = nc()

const store_id = process.env.store_id
const store_passwd = process.env.store_passwd
const is_live = process.env.is_live == 'false' ? false : true //true for live, false for sandbox

handler.post(async (req, res) => {
  try {
    console.log('--incomming req')
    // console.log(req.body)
    const { tran_id, val_id, amount, currency_type, status } = req.body
    // console.log({ tran_id, val_id, amount, currency_type, status })
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    const response = await sslcz.validate({
      val_id
    })
    console.log('Validation Response:', response)

    await db.connect()
    const order = await Order.findOne({ transactionId: tran_id })
    console.log(order.total)
    if (status == 'VALID' && order.total == response.amount) {
      order.paymentStatus = 'completed'
      await order.save()
    }

    const payment = new Payment({
      transactionId: response.tran_id,
      orderId: order._id,
      val_id: response.val_id,
      amount: response.amount,
      currency: response.currency,
      paymentMethod: response.card_type,
      paymentStatus: response.status === 'VALID' ? 'completed' : 'failed',
      paymentDate: new Date(response.tran_date),
      bankTransactionId: response.bank_tran_id,
      cardType: response.card_type,
      cardIssuer: response.card_issuer,
      cardBrand: response.card_brand,
      cardIssuerCountry: response.card_issuer_country,
      riskLevel: response.risk_level,
      riskTitle: response.risk_title
    })

    await payment.save()
    await db.disconnect()

    return res.status(200).send(`Payment Received For Tran Id: ${tran_id}`)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error })
  }
})

export default handler
