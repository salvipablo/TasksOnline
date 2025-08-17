import nodemailer from 'nodemailer'
import fs from 'fs/promises'
import axios from 'axios'

import { ShowLog } from './generals.service.js'

const loadCredentials = async () => {
  try {
    const data = await fs.readFile('./credencials.json', 'utf8')
    return JSON.parse(data)
  } catch (error) {
    ShowLog(`Error al cargar credenciales: ${error.message}`, 2)
    return null
  }
}

const CREDENCIALES = await loadCredentials()

const getAccessToken = async (refreshToken, clientId, clientSecret) => {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  return response.data.access_token;
}

const returnMailOptions = (dataForEmail) => {
  const { affair, description, mail, dynamicFileContent } = dataForEmail

  let options = {
    to: mail,
    subject: affair,
    text: description
  }

  if (!dataForEmail.dynamicFileContent) {
    return options
  } else {
    options.attachments = [
      {
        filename: 'salesOfTheDay.html',
        content: dynamicFileContent,
        contentType: 'text/html'
      }
    ];
    return options
  }
}

export const SendEmail = async (dataForEmail) => {
  try {
    const mailOptions = returnMailOptions(dataForEmail)

    const accessToken = await getAccessToken(CREDENCIALES.refresh_token, CREDENCIALES.client_id, CREDENCIALES.client_secret)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'task.system.notification@gmail.com',
        clientId: CREDENCIALES.client_id,
        clientSecret: CREDENCIALES.client_secret,
        refreshToken: CREDENCIALES.refresh_token,
        accessToken: accessToken,
      }
    });

    await transporter.sendMail(mailOptions)

    return { message: 'Email sent successfully' }
  } catch (error) {
    ShowLog(`SendEmail : ${error.message}`, 2)
    return { message: 'The email could not be sent correctly' }
  }
}
