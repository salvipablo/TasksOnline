import { Router } from "express"
import { google } from "googleapis"
import fs from 'fs/promises'

import { ShowLog } from "../services/generals.service.js"
import { AuthorizedUser } from "../controller/auth.controller.js"

const AuthRouter = Router()

const loadCredentials = async () => {
  try {
    const data = await fs.readFile('./credencials.json', 'utf8')
    return JSON.parse(data)
  } catch (error) {
    ShowLog(`Error loading credentials: ${error.messege}`, 2)
    return null
  }
}

const CREDENCIALES = await loadCredentials()

const oauth2Client = new google.auth.OAuth2(
  CREDENCIALES.client_id,
  CREDENCIALES.client_secret,
  CREDENCIALES.redirect_uris[0]
)

const scopes = ['https://mail.google.com/']

AuthRouter.get('/oauth2', (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  })
  res.redirect(url)
})

AuthRouter.get('/oauth2callback', (req, res) => {
  const { code } = req.query
  const { tokens } = oauth2Client.getToken(code)

  oauth2Client.setCredentials(tokens)
  req.session.tokens = tokens

  res.send('Authorization completed')
})

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) ShowLog(`refresh token: ${tokens.refresh_token}`, 1)
  ShowLog(`Access token: ${tokens.access_token}`, 1)
})

AuthRouter.post('/auth', AuthorizedUser)

export default AuthRouter
