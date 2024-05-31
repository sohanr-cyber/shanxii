import { GMAIL, PASSWORD } from '@/config'
import { template } from '@/utility/mail'
import nodemailer from 'nodemailer'
const from = process.env.FROM

class Mail {
  constructor () {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: GMAIL,
        pass: PASSWORD
      }
    })
    this.from = 'MuslimMatchMaker@gmail.com'
  }

  // async sendMail (to) {
  //   // send mail with defined transport object
  //   try {
  //     const info = await this.transporter.sendMail({
  //       from: this.from,
  //       to: 'sohanur01744@gmail.com',
  //       subject: '', // Subject line
  //       html: template({ to: 'sohanur01744@gmail.com' }) // html body
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async sendMail (data) {
    // send mail with defined transport object
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: data.to,
        subject: data.subject, // Subject line
        html: template(data) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default Mail
