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

// Simulación de la verificación de tareas y envío de correos
const checkTasksAndSendEmails = () => {
  // Aquí puedes poner tu lógica de verificación de tareas y envío de correos
  console.log("Verificando tareas y enviando correos...");

  // Esta es una simulación de las tareas
  const tasks = [
      { description: 'Tarea 1', emails: ['email1@example.com'] },
      { description: 'Tarea 2', emails: ['email2@example.com'] },
  ];

  tasks.forEach(task => {
      task.emails.forEach(email => {
          console.log(`Enviando correo a ${email} con la tarea: ${task.description}`);
      });
  });
};

// Llamar a la función cada minuto (10000 ms)
setInterval(checkTasksAndSendEmails, 10000);  // Ejecuta la cada 10 segundos

export default app
