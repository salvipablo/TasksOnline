import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// import routes
import TasksRouter from './routes/tasks.routes.js'

// import services
import { SendEmail } from './controller/emails.controller.js'

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
const checkTasksAndSendEmails = () => {
  try {
    SendEmail()
  } catch (error) {
    console.log(error.message);
  }
}

// Llamar a la función cada minuto (60000 ms)
setInterval(checkTasksAndSendEmails, 60000);  // Ejecuta la cada 60 segundos

export default app
