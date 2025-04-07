import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'

// import variables
import { SECRET } from './config.js'

// import routes
import TasksRouter from './routes/tasks.routes.js'
import AuthRouter from './routes/auth.routes.js'

// import services
import { startInterval } from './controller/emails.controller.js'

// Define the system path.
const __dirname = dirname(fileURLToPath(import.meta.url))

// Actializar tareas.
import { UpdateTasks } from './model/tasks.model.js'
UpdateTasks()

const app = express()

// Settings
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares.
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.use(session({ secret: SECRET, resave: false, saveUninitialized: true }));

// Routes.
app.use('/', AuthRouter)
app.use('/tasks', TasksRouter)

startInterval()

// 120.000 -> 2 Minutos.
//setInterval(SendEmails, 60000) // 1 minuto.
//setInterval(SendTestEmail, 60000)  // 1 minuto.

export default app
