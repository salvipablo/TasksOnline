import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

import {
  ShowLog
} from '../services/generals.service.js'

// Define the system path.
const __dirname = dirname(fileURLToPath(import.meta.url))

let Tasks = []
let LastTaskId = 0;

const SaveTasksOnDisk = (fromWhereFunctionCalled = 'It is not known') => {
  const filePath = path.join(__dirname, 'data.json')

  try {
    fs.writeFile(filePath, JSON.stringify(Tasks, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr)
        return
      }
      ShowLog(`Tasks saved to disk successfully - Function call: ${fromWhereFunctionCalled}`, 1)
    })
  } catch (error) { ShowLog(error.message, 2) }
}

const searchLastID = async () => {
  const filePath = path.join(__dirname, 'system.json')

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const jsonData = JSON.parse(data)
    return jsonData.lastTaskId + 1
  } catch (err) {
    console.error('Error al leer o parsear el archivo JSON:', err)
    return 0
  }
}

const saveNewID = () => {
  const filePath = path.join(__dirname, 'system.json')
  const newJsonData = { lastTaskId: LastTaskId }
  fs.writeFile(filePath, JSON.stringify(newJsonData, null, 2), (err) => {
    if (err) console.error('Error al escribir el archivo:', err)
    else ShowLog(`Last task ID saved to disk`, 1) 
  })
}

/* CRUD */

  // Create.
  export const SaveTaskDB  = async (task) => {
    if (!task) throw new Error('You have not submitted a task to save')

    LastTaskId = await searchLastID()

    task.id = LastTaskId

    Tasks.push(task)

    ShowLog(`New task created successfully - SaveTaskDB`, 1)

    SaveTasksOnDisk('SaveTaskDB')

    setTimeout(() => {
      saveNewID()
    }, 1000)

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
  export const UpdateTaskDB = (task) => {
    const index = Tasks.findIndex(t => t.id === task.id)

    if (index !== -1) {
      Tasks[index] = { ...Tasks[index], ...task }
    }

    SaveTasksOnDisk('UpdateTaskDB')

    return {
      statusSaveBD: 10002,
      message: "The task was successfully updated in the database"
    }

  }

  // Delete.
  export const DeleteTaskDB = (taskId) => {
    Tasks = Tasks.filter(task => task.id !== taskId)

    SaveTasksOnDisk('DeleteTaskDB')

    return {
      statusSaveBD: 10003,
      message: "The task was successfully deleted from the database."
    }
  }

/* CRUD */

export const CloseTaskNotice = (emailsStatus) => {
  emailsStatus.forEach(element => {
    let task = Tasks.find(e => e.id === element.id)
    if (task && element.shippingStatus) task.emailsSent = true
  })

  SaveTasksOnDisk('CloseTaskNotice')
}

export const UpdateTasks = async () => {
  const filePath = path.join(__dirname, 'data.json')

  try {
    const data = await fs.readFile(filePath, 'utf8')
    Tasks = JSON.parse(data)
  } catch (parseErr) {
    ShowLog(`Error al parsear el JSON: ${parseErr}`, 2)
  }

  ShowLog(`** Tasks updated from the database **`, 1)
}

export const ReturnTask = (id) => {
  try {
    let taskFound = Tasks.find(task => task.id === id)
    return taskFound
  } catch (error) {
    console.error(error.message)
  }
}

export const GetTasksByCondition = (currentDate) => {
  let tasksToBeSent = []

  try {
    const [currentYear, currentMonth, currentDay] = currentDate.split('-').map(num => parseInt(num, 10))

    if (isNaN(currentYear) || isNaN(currentMonth) || isNaN(currentDay)) {
      console.error(`Invalid current date format: ${currentDate}`)
      return tasksToBeSent
    }

    // Crear fecha comparable
    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay)

    Tasks.forEach(element => {
      try {
        const cleanTaskDate = element.noticeDate.toString().trim()
        const [taskYear, taskMonth, taskDay] = cleanTaskDate.split('-').map(num => parseInt(num, 10))

        // Validar componentes de fecha de tarea
        if (isNaN(taskYear) || isNaN(taskMonth) || isNaN(taskDay)) {
          console.error(`Invalid task date format for task ${element.id}: ${element.noticeDate}`)
          return // Skip this task
        }

        const taskDateObj = new Date(taskYear, taskMonth - 1, taskDay)

        const taskDateStr = taskDateObj.toISOString().split('T')[0];
        const currentDateStr = currentDateObj.toISOString().split('T')[0];

        if (taskDateStr === currentDateStr && !element.emailsSent) {
          tasksToBeSent.push(element)
        }
      } catch (taskError) {
        console.error(`Error processing task ${element.id}:`, taskError)
      }
    })
  } catch (error) {
    console.error('Error in GetTasksByCondition:', error)
  }

  return tasksToBeSent
}
