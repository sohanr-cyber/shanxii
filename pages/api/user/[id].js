import nextConnect from 'next-connect'
import UserService from '@/services/user-service'
import { isAuth } from '@/utilty'

const handler = nextConnect()
handler.use(isAuth)
handler.get(async (req, res) => {
  try {
    const service = new UserService()
    const user = await service.FindUserProfileById(req.user._id)

    return res.status(200).send(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

handler.put(async (req, res) => {
  try {
    const service = new UserService()
    const user = await service.UpdateUser({
      ...req.body,
      _id: req.user._id
    })
    console.log(user)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

handler.delete(async (req, res) => {
  try {
    const service = new UserService()
    const data = await service.DeleteUserById(req.user_id)
    console.log(data)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})
export default handler
