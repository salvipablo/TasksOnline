import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import TasksRouter from './routes/tasks.routes.js'

const app = express()

// Define the system path.
const __dirname = dirname(fileURLToPath(import.meta.url))

// Settings
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares.
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

// Routes.
app.use('/', TasksRouter)

export default app
