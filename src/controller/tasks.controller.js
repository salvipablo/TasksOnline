import {
  SaveTaskDB,
} from "../repository/tasks.repository.js"

  // ReturnTasksDB,
  // DeleteTaskDB,
  // ReturnTask,
  // UpdateTaskDB


export const CreateTask = (req, res) => {
  try {
    const { affair, description, noticeDate, mails, emailsSent, timeRepeatTask } = req.body

    let newTaskToSave = {
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

    let opStatus = DeleteTaskDB(parseInt(id))

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

export const GetTask = (req, res) => {
  try {
    const { id } = req.params

    let taskFound = ReturnTask(parseInt(id))

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
