import UserService from '@/services/user-service'
import { isAuth } from '@/utility'
import nextConnect from 'next-connect'
import { getPlaceholderImage } from '@/utility/image'
import Mail from '@/services/mail-service'

const handler = nextConnect()
const mail = new Mail()

handler.post(async (req, res) => {
  const { name, email, content, subject } = req.body

  try {
    await mail.sendMail({
      to: email,
      name,
      subject,
      content,
      for: 'message'
    })

    return res.status(200).json({
      message: `Mail Sent to ${name}`
    })
  } catch (error) {
    console.error('Error sending mail:', error)
    return res.status(400).json({
      message: 'Failed to send mail',
      error: error.message
    })
  }
})

export default handler
