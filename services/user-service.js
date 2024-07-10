import UserRepository from '@/database/repository/user-repository'

import {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
  FormateData
} from '../utility/index'
import { generateVerificationCode } from '@/utility/helper'
import Mail from './mail-service'
import { companyName } from '@/utility/const'

class UserService {
  constructor () {
    this.repository = new UserRepository()
    this.mailService = new Mail()
  }

  async SignUp (userInputs) {
    const { email, password } = userInputs
    const existingUser = await this.repository.FindUser({ email })
    if (existingUser) {
      return FormateData({ error: 'Email Already Exist !' })
    }
    let salt = await GenerateSalt()
    let userPassword = await GeneratePassword(password, salt)

    const verificationCode = generateVerificationCode(6)
    const expirationTime = new Date()
    expirationTime.setMinutes(expirationTime.getMinutes() + 5)
    // const profileId = await this.repository.generateId()

    const existUser = await this.repository.CreateUser({
      ...userInputs,
      password: userPassword,
      salt,
      verificationCode,
      expirationTime
    })

    // send code to mail
    await this.mailService.sendMail({
      code: verificationCode,
      expirationTime: '5 minutes',
      to: existUser.email,
      name: existUser.firstName,
      for: 'verification',
      verification: true,
      subject: `Account Verification -${companyName}`
    })

    console.log({ existUser })

    const token = await GenerateSignature({
      email: email,
      _id: existUser._id,
      role: existUser.role
    })

    return FormateData({
      id: existUser._id,
      token,
      role: existUser.role
    })
  }

  async SignIn (userInputs) {
    try {
      console.log(userInputs)
      const { email, password } = userInputs
      const existingUser = await this.repository.FindUser({ email })
      if (!existingUser) {
        return FormateData({ error: 'User Not Found With This Gmail !' })
      }
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password.toString(),
          existingUser.password,
          existingUser.salt
        )
        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
            role: existingUser.role
          })
          return FormateData({
            id: existingUser._id,
            token,
            role: existingUser.role
          })
        } else {
          return FormateData({ error: "Password Didn't Match !" })
        }
      }

      return FormateData({ error: 'User Not Found' })
    } catch (error) {
      console.log(error)
    }
  }

  async FindUserProfileById (userId) {
    try {
      const existingUser = await this.repository.FindUserProfileById(userId)
      return FormateData(existingUser)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateUser (userInputs) {
    try {
      const { email, password, ...DataToUpdate } = userInputs
      const existingUser = await this.repository.UpdateUser(DataToUpdate)
      return FormateData(existingUser)
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteUserById (userId) {
    try {
      const result = await this.repository.DeleteUserById(userId)
      if (result) {
        return FormateData({
          message: 'Deleted Sucessfully'
        })
      } else {
        return FormateData({
          error: 'Something Went Wrong'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService
