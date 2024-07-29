import db from '@/database/connection'
import User from '@/database/model/User'
import UserService from '@/services/user-service'
import { GenerateSignature } from '@/utility'
import { generateVerificationCode } from '@/utility/helper'
import nextConnect from 'next-connect'
const handler = nextConnect()
import Mail from '@/services/mail-service'
import { companyName } from '@/utility/const'

// Password Reset Code
// Check Existance of Mail , Send Verification Code to That Mail For Password Reset
handler.post(async (req, res) => {
  try {
    const { email } = req.body
    const mailService = new Mail()
    await db.connect()

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(200).json({ error: 'User not found' })
    }

    const verificationCode = generateVerificationCode(6)
    user.verificationCode = verificationCode
    const expirationTime = new Date()
    expirationTime.setMinutes(expirationTime.getMinutes() + 5)
    user.expirationTime = expirationTime

    await user.save()
    console.log(user)
    // send notification with Password Reset Code
    await mailService.sendMail({
      code: verificationCode,
      expirationTime: '5 minutes',
      subject: `Account Password Reset -${companyName}`,
      to: user.email,
      for: 'Verification'
    })

    return res.status(200).json({ message: 'Code Sent To Your Mail' })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

export default handler
