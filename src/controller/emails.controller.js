import {
  ServiceSendingEmail
} from "../services/emails.service.js"

import {
  GetTasksByCondition,
  CloseTaskNotice
} from "../model/tasks.model.js"

const emailSendingStatus = []

let intervalId
let intervalTime = 10000 // 10 segundos.

const CambiarTiempoDeLlamadoEnvioMails = () => {
  clearInterval(intervalId); // Limpiar el intervalo actual

  const newIntervalTime = 300000; // 5 minutos.

  intervalTime = newIntervalTime; // Actualizamos el intervalo a 3 horas

  startInterval();
}

export const startInterval = () => {
  intervalId = setInterval(SendEmails, intervalTime)
}

export const SendTestEmail = async () => {
  let emailToSend = {
    affair: 'Asunto de prueba',
    description: 'Descripcion de prueba',
    mails: [ 'salvipablo@gmail.com', 'albertoaranda48@hotmail.com', 'bonicamboriu@gmail.com' ]
  }

  let opStatus = await ServiceSendingEmail(emailToSend)
  console.log(opStatus)
}

const SendEmailForTask = async (task) => {
  let affair = task.affair
  let description = task.description
  let satisfactoryDelivery = true

  // Creamos un array de promesas
  const emailPromises = task.mails.map(async mail => {
    let dataEmail = {
      affair,
      description,
      mail
    }

    let opStatus = await ServiceSendingEmail(dataEmail)

    // Devolvemos el estado de la operación
    return opStatus.message !== 'The email could not be sent correctly'
  })

  // Esperamos a que todas las promesas se resuelvan
  const results = await Promise.all(emailPromises)
  
  // Si alguna operación falló, marcamos como no satisfactorio
  satisfactoryDelivery = results.some(status => status === true)

  emailSendingStatus.push({
    id: task.id,
    shippingStatus: satisfactoryDelivery
  })
}

export const SendEmails = async () => {
  let ChosenDateConverted = new Date().toISOString().split('T')[0]
  let tasksToSend = GetTasksByCondition(ChosenDateConverted)

  if (tasksToSend.length === 0)  return "There are no assignments to submit on this date"

  const taskPromises = tasksToSend.map(async task => {
    if (!task.emailsSent) {
      console.log('Tarea enviada a proceso de envio de notificacion');
      return await SendEmailForTask(task)
    }
  })

  await Promise.all(taskPromises)

  console.log('Llegue al CloseTaskNotice')
  console.log(emailSendingStatus)

  CloseTaskNotice(emailSendingStatus)

  CambiarTiempoDeLlamadoEnvioMails()

  return "Tasks sent to email notification"
}

export const testSetInterval = () => {
  try {
    // Aquí va tu lógica para enviar los correos
    console.log("Emails enviados");

    // Ahora cambiamos el intervalo después de la ejecución de SendEmails
    clearInterval(intervalId); // Limpiar el intervalo actual

    const newIntervalTime = 300000; // 5 minutos.

    intervalTime = newIntervalTime; // Actualizamos el intervalo a 3 horas

    // Iniciar un nuevo intervalo con el nuevo tiempo
    startInterval();

  } catch (error) {
    console.error("Error al enviar los correos:", error);
  }
}