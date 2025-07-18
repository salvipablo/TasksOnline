import { Sequelize } from 'sequelize'

import { TasksSchema } from '../models/tasks.model.js'
import { EmailForTaskSchema } from '../models/emailsForTask.model.js'
import { ShowLog } from '../services/generals.service.js'

/* CRUD */

  // Create.
  export const SaveTaskDB  = async (task) => {
    try {
      let taskDB = {
        affair: task.affair,
        description: task.description,
        user_id: task.userID,
        notice_date: task.noticeDate,
        emails_sent: task.emailsSent,
        time_repeat: task.timeRepeatTask
      }

      let taskSave = await TasksSchema.create(taskDB)

      saveEmails(taskSave.id, task.mails)

      ShowLog('The task was successfully stored in the database', 1)

      // TODO: Aca ver que conviene regresar, porque en la tarea GetTasks hay que devolver las tareas.
      // Por ahi conviene regresar un objeto con codigo de operacion y en este caso data vacia.
      // Y en el caso de GetTasks, se duevulve codigo de operacion y data con las tareas.
      return 10000
    } catch (error) {
      // TODO: Habra que ver si envio otros codigo para el mensaje a responder al usuario en el controlador.
      ShowLog(error.message, 2)
      return 10001
    }
  }

  // Read.
  export const ReturnTasksDB = async (idUser) => {
    try {
      const tasks = await TasksSchema.findAll({
        where: {
          user_id: idUser,
        },
        include: [{
          model: EmailForTaskSchema,
          attributes: ['mail']
        }]
      })

      return tasks.map(task => {
        const taskJSON = task.toJSON()
        taskJSON.emails = taskJSON.emailsForTasks.map(email => email.mail)
        delete taskJSON.emailsForTasks
        return taskJSON
      })
    } catch (error) {
      ShowLog(error.message, 2)
    }
  }

  // Update.
  export const UpdateTaskDB = async (task) => {
    try {
      let updateTask = {
        id: task.id,
        affair: task.affair,
        description: task.description,
        notice_date: task.noticeDate,
        emails_sent: task.emailsSent,
        time_repeat: task.timeRepeatTask
      }

      await TasksSchema.update(
        updateTask,
        { where: { id: updateTask.id } }
      )

      updateMails(task.id, task.mails)

      return 10000
    } catch (error) {
      return 10001
    }
  }

  // Delete.
  export const DeleteTaskDB = async (taskId) => {
    try {
      await TasksSchema.destroy({
        where: {
          id: taskId
        }
      })

      deleteEmails(taskId)

      // TODO: Aca ver que conviene regresar, porque en la tarea GetTasks hay que devolver las tareas.
      // Por ahi conviene regresar un objeto con codigo de operacion y en este caso data vacia.
      // Y en el caso de GetTasks, se duevulve codigo de operacion y data con las tareas.
      return 10000
    } catch (error) {
      // TODO: Habra que ver si envio otros codigo para el mensaje a responder al usuario en el controlador.
      return 10005
    }
  }

/* CRUD */

const saveEmails = async (taskID, mails) => {
  try {
    mails.forEach(async element => {
      let newEmailSave = {
        task_id: taskID,
        mail: element
      }

      await EmailForTaskSchema.create(newEmailSave)
    })
  } catch (error) {
    ShowLog(error.message, 2)
  }
}

const deleteEmails = async (taskID) => {
  try {
      await EmailForTaskSchema.destroy({
        where: {
          task_id: taskID
        }
      })
  } catch (error) {
    ShowLog(error.message, 2)
  }
}

const updateMails = async (tasksID, mails) => {
  try {
    deleteEmails(tasksID)
    saveEmails(tasksID, mails)
  } catch (error) {
    ShowLog(error.message, 2)
  }
}

export const ReturnTask = async (taskId) => {
  const task = await TasksSchema.findByPk(taskId, {
    include: [{
      model: EmailForTaskSchema,
      attributes: ['mail']
    }]
  })
  
  if (!task) return null
  
  const taskJSON = task.toJSON()
  taskJSON.emails = taskJSON.emailsForTasks.map(email => email.mail)
  delete taskJSON.emailsForTasks
  return taskJSON
}

export const GetTasksByCondition = async (currentDate) => {
  try {
    const tasks = await TasksSchema.findAll({
      where: {
        notice_date: {
          [Sequelize.Op.eq]: currentDate, // Filtra tareas donde notice_date sea igual a currentDate
        },
        emails_sent: 0
      },
      include: [{
        model: EmailForTaskSchema,
        attributes: ['mail'],
      }],
    })

    return tasks.map(task => {
      const taskJSON = task.toJSON()
      taskJSON.emails = taskJSON.emailsForTasks.map(email => email.mail)
      delete taskJSON.emailsForTasks
      return taskJSON
    })
  } catch (error) {
    ShowLog(error.message, 2)
  }
}

export const CloseTaskNotice = async (emailsStatus) => {
  emailsStatus.forEach(async element => {
    let sendStatus = element.shippingStatus === true ? 1 : 0

    await TasksSchema.update(
      { emails_sent: sendStatus },
      {
        where: {
          id: element.id,
        }
      }
    )
  })
}
