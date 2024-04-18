import db from '../connection'
import User from '../model/User'

class UserRepository {
  constructor () {}
  async CreateUser (userInputs) {
    try {
      await db.connect()
      const user = new User({
        ...userInputs,
        role: 'admin'
      })

      const userResult = await user.save()

      await db.disconnect()
      return userResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindUser ({ email }) {
    try {
      await db.connect()
      const existingCustomer = await User.findOne({ email: email })
      return existingCustomer
    } catch (error) {
      console.log(error)
    }
  }

  async FindUserProfileById (userId) {
    try {
      await db.connect()
      const existingUser = await User.findOne(
        { _id: userId },
        {
          password: 0,
          salt: 0
        }
      )

      console.log(existingUser)
      await db.disconnect()
      return existingUser
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateUser (dataToUpdate) {
    try {
      await db.connect()
      const existingUser = await User.findOneAndUpdate(
        { _id: dataToUpdate._id },
        { ...dataToUpdate },
        { new: true }
      )
      await db.disconnect()
      return existingUser
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteUserById (id) {
    try {
      await db.connect()
      const deletedUser = await User.findOneAndDelete({ _id: id })
      await db.disconnect()
      console.log(deletedUser)
      return deletedUser
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserRepository
