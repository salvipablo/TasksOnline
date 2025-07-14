import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'

// import variables
import { SECRET } from './config.js'

// import routes
import TasksRouter from './routes/tasks.routes.js'
import AuthRouter from './routes/auth.routes.js'
import LoginRouter from './routes/login.routes.js'

// import services
import { startInterval } from './controller/emails.controller.js'

// Define the system path.
// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middlewares.
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: SECRET, resave: false, saveUninitialized: true }))

// Routes.
app.use('/', AuthRouter)
app.use('/tasks', TasksRouter)
app.use('/login', LoginRouter)

// Email service.
startInterval(false)

export default app
