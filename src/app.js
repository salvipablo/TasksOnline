import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// import routes
import TasksRouter from './routes/tasks.routes.js'

// import services
import { SendEmails } from './controller/emails.controller.js'

// Actializar tareas.
import { UpdateTasks } from './model/tasks.model.js'
UpdateTasks()

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

// Simulación de la verificación de tareas y envío de correos
const checkTasksAndSendEmails = async () => {
  try {
    let opStatus = await SendEmails()
    console.log(opStatus)
  } catch (error) {
    console.log(error.message)
  }
}

// 300.000 -> 5 Minutos.
//setInterval(checkTasksAndSendEmails, 300000)

export default app
