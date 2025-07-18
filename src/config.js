import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_DIALECT = process.env.DB_DIALECT
export const PATH_APP = process.env.PATH_APP
export const EMAIL = process.env.EMAIL
export const MAIL_TOKEN = process.env.MAIL_TOKEN
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN
export const SECRET = process.env.SECRET