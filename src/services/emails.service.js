import nodemailer from 'nodemailer'
import { google } from "googleapis"
import fs from 'fs/promises';

async function cargarCredenciales() {
  try {
    const data = await fs.readFile('./credencials.json', 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al cargar credenciales:', error)
    return null
  }
}
const CREDENCIALES = await cargarCredenciales()

const oauth2Client = new google.auth.OAuth2(
  CREDENCIALES.web.client_id,
  CREDENCIALES.web.client_secret,
  CREDENCIALES.web.redirect_uris[0]
)

import { MAIL_TOKEN, REFRESH_TOKEN, EMAIL } from '../config.js'

export const ServiceSendingEmail = async (dataForEmail) => {
  try {
    const { affair, description, mail } = dataForEmail

    const mailOptions = {
      from: EMAIL,
      to: mail,
      subject: affair,
      text: description
    }

    let tokens = {
      mail_token: MAIL_TOKEN,
      refresh_token: REFRESH_TOKEN
    }

    oauth2Client.setCredentials({
      refresh_token: tokens.refresh_token,
    });
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: 'task.system.notification@gmail.com',
          clientId: CREDENCIALES.web.client_id,
          clientSecret: CREDENCIALES.web.client_secret,
          refreshToken: tokens.refresh_token,
          accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    await transporter.sendMail(mailOptions)

    return { message: 'Email sent successfully' }
  } catch (error) {
    console.log(error.message);
    return { message: 'The email could not be sent correctly' }
  }
}
