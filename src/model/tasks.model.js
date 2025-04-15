import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Define the system path.
const __dirname = dirname(fileURLToPath(import.meta.url))

let Tasks = []

const SaveTasksOnDisk = () => {
  const filePath = path.join(__dirname, 'data.json')

  try {
    // Escribir de nuevo el archivo JSON
    fs.writeFile(filePath, JSON.stringify(Tasks, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error al escribir el archivo:', writeErr)
        return
      }
      console.log('Tarea guardadas en disco con éxito.')
    })
  } catch (error) {
    console.log(error.message)
  }

}

/* CRUD */

  // Create.
  export const SaveTaskDB  = (task) => {
    if (!task) throw new Error('You have not submitted a task to save')

    Tasks.push(task)

    SaveTasksOnDisk()

    return {
      statusSaveBD: 10001,
      message: "The task was successfully saved to the database"
    }
  }

  // Read.
  export const ReturnTasksDB = () => {
    return Tasks
  }

  // Update.

  // Delete.
  export const DeleteTaskDB = (taskId) => {
    Tasks = Tasks.filter(task => task.id !== taskId);

    SaveTasksOnDisk()

    return {
      statusSaveBD: 10003,
      message: "The task was successfully deleted from the database."
    }
  }

/* CRUD */
export const GetTasksByCondition = (currentDate) => {
  let tasksToBeSent = []

  Tasks.forEach(element => {
    if (element.noticeDate === currentDate && !element.emailsSent) tasksToBeSent.push(element)
  })

  return tasksToBeSent
}

export const CloseTaskNotice = (emailsStatus) => {
  emailsStatus.forEach(element => {
    let task = Tasks.find(e => e.id === element.id)
    if (task && element.shippingStatus) task.emailsSent = true
  })

  SaveTasksOnDisk()
}

export const UpdateTasks = () => {
  const filePath = path.join(__dirname, 'data.json')

  // Lee el archivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err)
      return
    }

    // Parsea el contenido JSON
    try {
      Tasks = JSON.parse(data)
    } catch (parseErr) {
      console.error('Error al parsear el JSON:', parseErr)
    }
  })

  console.log("** Tasks updated from the database **")
}
