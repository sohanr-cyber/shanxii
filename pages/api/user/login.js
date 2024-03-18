import UserService from '@/services/user-service'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const service = new UserService()
    const { email, password } = req.body
    const user = await service.SignIn({
      email,
      password: password
    })

    return res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
