import {
  SaveTask,
  ReturnTasks
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
    res.render('viewTasks')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const CreateTask = (req, res) => {
  try {
    const { affair, description, noticeDate, mails, emailsSent, timeRepetTask } = req.body

    let newTaskToSave = {
      affair,
      description,
      noticeDate,
      mails,
      emailsSent,
      timeRepetTask
    }

    let opStatus = SaveTask(newTaskToSave)
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
    let tasks = ReturnTasks()

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
