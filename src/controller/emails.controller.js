import { ServiceSendingEmail } from "../services/emails.service.js"
import { ShowLog } from "../services/generals.service.js"

import {
  GetTasksByCondition,
  CloseTaskNotice
} from "../model/tasks.model.js"

const emailSendingStatus = []

let intervalId
let intervalTime = 10000

const IntervalTimeSendingMails = () => {
  clearInterval(intervalId)
  const newIntervalTime = 18000000
  intervalTime = newIntervalTime
  startInterval()
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

  return opStatus
}

const SendEmailForTask = async (task) => {
  let affair = task.affair
  let description = task.description
  let satisfactoryDelivery = true

  const emailPromises = task.mails.map(async mail => {
    let dataEmail = {
      affair,
      description,
      mail
    }

    let opStatus = await ServiceSendingEmail(dataEmail)

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

  let ChosenDateConverted = new Date().toISOString().split('T')[0]
  let tasksToSend = GetTasksByCondition(ChosenDateConverted)

  if (tasksToSend.length === 0)  return "There are no assignments to submit on this date"

  const taskPromises = tasksToSend.map(async task => {
    if (!task.emailsSent) {
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