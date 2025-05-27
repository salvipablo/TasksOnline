import { TasksSchema } from '../models/tasks.model.js'
import { EmailForTaskSchema } from '../models/emailsForTask.model.js'
import { ShowLog } from '../services/generals.service.js'

/* CRUD */
  export const SaveTaskDB  = async (task) => {
    try {
      console.log(task);

      // Armo la task para guardar en la tabla tasks, sin los emails.
      let taskDB = {
        affair: task.affair,
        description: task.description,
        user_id: 1,
        notice_date: task.noticeDate,
        emails_sent: task.emailsSent,
        time_repeat: task.timeRepeatTask
      }

      // Envio a guardar tarea a la base usando schema.
      let taskSave = await TasksSchema.create(taskDB)

      //Envio a guardar emails a base de datos.
      saveEmails(taskSave.id, task.mails)

      // Si llego aca es porque el guardado finalizo correctamente, muestro un log en pantalla.
      ShowLog('The task was successfully stored in the database', 1)

      // Retorno codigo de almacenado correcto.
      return 10000
    } catch (error) {
      // Retorno codigo de almacenado incorrecto.
      // Habra que ver si envio otros codigo para el mensaje a responder al usuario en el controlador.
      return 10001
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
    });
  } catch (error) {
    ShowLog(error.message, 2)
  }
}