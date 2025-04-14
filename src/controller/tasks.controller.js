import { v4 as uuidv4 } from 'uuid'

import {
  SaveTaskDB,
  ReturnTasksDB,
  DeleteTaskDB
} from "../model/tasks.model.js"

export const ManageTasks = (_req, res) => {
  try {
    res.render('index')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ViewTasks = (_req, res) => {
  try {
    let tasks = ReturnTasksDB()

    res.render('viewTasks', {
      tasks
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const CreateTask = (req, res) => {
  try {
    const { affair, description, noticeDate, mails, emailsSent, timeRepeatTask } = req.body

    let id = uuidv4()

    let newTaskToSave = {
      id,
      affair,
      description,
      noticeDate,
      mails,
      emailsSent,
      timeRepeatTask
    }

    let opStatus = SaveTaskDB(newTaskToSave)
    // TODO: Aqui podria ir una logica para guardar con log con operacion exitosa.

    res.status(201).send({
      message: "The task was saved successfully"
    })  
  } catch (error) {
    //TODO: Aqui faltaria una logica para guardar error que se produce en log o algo asi

    res.status(404).send({
      message: error.message
    })  
  }
}

export const GetTasks = (_req, res) => {
  try {
    let tasks = ReturnTasksDB()

    //TODO: Aqui podria ir una logica para guardar cuando el usuario pidio las tareas.

    res.status(200).send({
      message: tasks
    })
  } catch (error) {
    //TODO: Aqui podria una logica para guardar error, por ejemplo si la base no esta disponible

    res.status(404).send({
      message: error.message
    })
  }
}

export const DeleteTask = (req, res) => {
  try {
    const { id } = req.params

    let opStatus = DeleteTaskDB(id)

    // TODO: Aqui podria ir una logica para guardar con log con operacion exitosa.

    res.status(200).send({
      message: "The task was successfully deleted"
    })  
  } catch (error) {
    //TODO: Aqui faltaria una logica para guardar error que se produce en log o algo asi

    res.status(500).send({
      message: error.message
    })
  }
}
