import db from '@/database/connection'
import User from '@/database/model/User'
import UserService from '@/services/user-service'
import { generateVerificationCode } from '@/utility/helper'
import { GenerateSignature } from '@/utility'
import nextConnect from 'next-connect'
import Mail from '@/services/mail-service'
import { companyName } from '@/utility/const'
const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { userId, code } = req.body

    const user = await User.findById(userId)
    if (user.isVerified == true) {
      const token = await GenerateSignature({
        email: user.email,
        _id: user._id,
        isVerified: user.isVerified
      })
      // Return success response
      return res.status(200).json({
        id: user._id,
        token,
        name: user.name,
        active: user.active,
        isVerified: user.isVerified
      })
    }
    // Check if the user exists and if the provided code matches
    if (!user || user.verificationCode !== code) {
      console.log('invalid input')
      return res.status(200).json({ error: 'Invalid verification code.' })
    }

    // Check if the code has expired
    if (user.expirationTime && new Date() > new Date(user.expirationTime)) {
      console.log('expired')
      return res.status(200).json({ error: 'Verification code has expired.' })
    }

    // Update isVerified field to true
    user.isVerified = true

    // Clear verification code and expiration time
    user.verificationCode = undefined
    user.expirationTime = undefined

    // Save the updated user document
    await user.save()
    const token = await GenerateSignature({
      email: user.email,
      _id: user._id,
      isVerified: user.isVerified
    })
    // Return success response
    return res.status(200).json({
      id: user._id,
      token,
      name: user.name,
      active: user.active,
      isVerified: user.isVerified
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'internal server error' })
  }
})

handler.put(async (req, res) => {
  try {
    const { email, id } = req.body
    await db.connect()
    const user = await User.findOne({ _id: id })

    if (!user) {
      return res.status(200).json({ error: 'User not found !' })
    }

    if (user.isVerified) {
      return res.status(200).json({ error: 'Allready Verified !' })
    }

    const verificationCode = generateVerificationCode(6)
    user.verificationCode = verificationCode
    const expirationTime = new Date()
    expirationTime.setMinutes(expirationTime.getMinutes() + 5)
    user.expirationTime = expirationTime
    console.log(verificationCode)
    await user.save()
    await db.disconnect()
    // send mail
    const mail = new Mail()
    // send code to mail
    await mail.verification({
      code: verificationCode,
      expirationTime: '5 minutes',
      to: 'sohanur01744@gmail.com',
      name: user.firstName,
      verification: true,
      subject: `Account Verification -${companyName}`
    })

    console.log({ user })

    return res.status(200).json({ message: 'Code Sent To Your Mail' })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

export default handler
