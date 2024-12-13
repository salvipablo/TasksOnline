import nodemailer from 'nodemailer'

import { PASS_EMAIL } from '../config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false, // use SSL
  port: 25, // port for secure SMTP
  auth: {
    user: 'salvipablo@gmail.com',
    pass: PASS_EMAIL
  },
  tls: {
    rejectUnauthorized: false
  }
})

export const ServiceSendingEmail = async (dataForEmail) => {
  try {
    const { affair, description, mail } = dataForEmail

    const mailOptions = {
      from: 'salvipablo@gmail.com',
      to: mail,
      subject: affair,
      text: description
    }

    await transporter.sendMail(mailOptions)

    return { message: 'Email sent successfully' }
  } catch (error) {
    return { message: 'The email could not be sent correctly' }
  }
}
