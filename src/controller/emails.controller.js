import { SendEmail } from "../services/emails.service.js"

import { ShowLog } from "../services/generals.service.js"

import {
  GetTasksByCondition,
  CloseTaskNotice
} from "../repository/tasks.repository.js"

const emailSendingStatus = []

let intervalId
let intervalTime = 10000

const IntervalTimeSendingMails = () => {
  clearInterval(intervalId)
  const newIntervalTime = 18000000
  intervalTime = newIntervalTime
  startInterval()
}

export const startInterval = (active) => {
  if (active) intervalId = setInterval(SendEmails, intervalTime)
}

export const SendTestEmail = async (contentFileToSend) => {
  let emailToSend = {
    affair: 'Venta del dia',
    description: 'Esta es una casilla de envio automatico de email, no responder a este......',
    mail: 'luciana.n.salvi@gmail.com',
    dynamicFileContent: contentFileToSend
  }

  let opStatus = await SendEmail(emailToSend)

  return opStatus
}

const SendEmailForTask = async (task) => {
  let affair = task.affair
  let description = task.description
  let satisfactoryDelivery = true

  const emailPromises = task.emails.map(async mail => {
    let dataEmail = {
      affair,
      description,
      mail
    }

    let opStatus = await SendEmail(dataEmail)

    return opStatus.message !== 'The email could not be sent correctly'
  })

  const results = await Promise.all(emailPromises)
  
  satisfactoryDelivery = results.some(status => status === true)

  emailSendingStatus.push({
    id: task.id,
    shippingStatus: satisfactoryDelivery
  })
}

export const SendEmails = async () => {
  ShowLog("Executing the email sending routine", 1)

  IntervalTimeSendingMails()

  /*
  * In this sentence, to take the date, which will be sent to the task search function for the current
  * day, toLocaleString() must be used, since on the server there are two time zones, one international
  * and one national, otherwise from 10 PM in Argentina on the server it is another day with 
  * the international time zone.
  */
  let ChosenDateConverted = new Date().toLocaleString().split('T')[0]
  let tasksToSend = await GetTasksByCondition(ChosenDateConverted)

  if (tasksToSend.length === 0)  return "There are no assignments to submit on this date"

  const taskPromises = tasksToSend.map(async task => {
    if (task.emails_sent === 0) {
      return await SendEmailForTask(task)
    }
  })

  await Promise.all(taskPromises)

  CloseTaskNotice(emailSendingStatus)

  return "Tasks sent to email notification"
}

export const testSetInterval = () => {
  try {
    clearInterval(intervalId)

    const newIntervalTime = 300000

    intervalTime = newIntervalTime

    startInterval()
  } catch (error) {
    ShowLog(`Error sending emails: ${error.message}`, 2)
  }
}