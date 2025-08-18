import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

// import routes
import TasksRouter from './routes/tasks.routes.js'
import AuthRouter from './routes/auth.routes.js'
import LoginRouter from './routes/login.routes.js'
import LubriRouter from './routes/lubri.routes.js'
import TerRouter from './routes/ter.routes.js'

// import services
import { startInterval } from './controller/emails.controller.js'

// Environment variable for email function.
import { ENVIRONMENT } from './config.js'

// Define the system path.
// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// TODO: Ver el temas de los CORS, como habilitar solo la aplicacion de Luciana y no todos los origenes.

// Middlewares.
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Routes.
app.use('/', AuthRouter)
app.use('/tasks', TasksRouter)
app.use('/login', LoginRouter)
app.use('/lubricentro', LubriRouter)
app.use('/pjs', TerRouter)

// Email service.
startInterval(ENVIRONMENT === 'production')

export default app
