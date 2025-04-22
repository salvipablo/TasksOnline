import { Router } from "express"
import { google } from "googleapis"
import fs from 'fs/promises'

const AuthRouter = Router()

const loadCredentials = async () => {
  try {
    const data = await fs.readFile('./credencials.json', 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading credentials:', error)
    return null
  }
}
const CREDENCIALES = await loadCredentials()

const oauth2Client = new google.auth.OAuth2(
  CREDENCIALES.web.client_id,
  CREDENCIALES.web.client_secret,
  CREDENCIALES.web.redirect_uris[0]
)

const scopes = ['https://mail.google.com/']

AuthRouter.get('/oauth2', (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  })
  res.redirect(url)
})

AuthRouter.get('/oauth2callback', async (req, res) => {
  const { code } = req.query
  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  req.session.tokens = tokens
  res.send('Authorization completed')
})

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) console.info("refresh token", tokens.refresh_token)
  console.info("access token", tokens.access_token)
})

export default AuthRouter
