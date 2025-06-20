import {
  SaveTaskDB,
  ReturnTasksDB,
  DeleteTaskDB,
  ReturnTask,
  UpdateTaskDB
} from "../repository/tasks.repository.js"

import { ShowLog } from "../services/generals.service.js"

export const CreateTask = (req, res) => {
  try {
    const { userID, affair, description, noticeDate, mails, emailsSent, timeRepeatTask } = req.body

    let newTaskToSave = {
      userID,
      affair,
      description,
      noticeDate,
      mails,
      emailsSent,
      timeRepeatTask
    }

    SaveTaskDB(newTaskToSave)

    ShowLog('Successful task creation', 1)

    res.status(201).send({
      message: "The task was saved successfully"
    })
  } catch (error) {
    ShowLog(`Task creation failed: ${error.message}`, 2)

    res.status(401).send({
      message: error.message
    })
  }
}

export const GetTasks = async (req, res) => {
  try {
    const { id } = req.params

    let tasks = await ReturnTasksDB(id)

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

export const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params

    await DeleteTaskDB(parseInt(id))

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

export const UpdateTask = (req, res) => {
  try {
    const { id, affair, description, noticeDate, mails, emailsSent, timeRepeatTask } = req.body

    let taskToUpdate = {
      id: parseInt(id),
      affair,
      description,
      noticeDate,
      mails,
      emailsSent,
      timeRepeatTask
    }

    UpdateTaskDB(taskToUpdate)

    res.status(201).send({
      message: "The task was successfully updated in the database"
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

export const GetTask = async (req, res) => {
  try {
    const { id } = req.params

    let taskFound = await ReturnTask(parseInt(id))

    // TODO: Aqui podria ir una logica para guardar con log con operacion exitosa.

    res.status(200).send({
      message: taskFound
    })  
  } catch (error) {
    //TODO: Aqui faltaria una logica para guardar error que se produce en log o algo asi

    res.status(500).send({
      message: error.message
    })
  }
}
