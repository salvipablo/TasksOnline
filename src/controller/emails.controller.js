import {
  ServiceSendingEmail
} from "../services/emails.service.js"

import {
  GetTasksByCondition,
  CloseTaskNotice
} from "../model/tasks.model.js"

const emailSendingStatus = []

const SendEmailForTask = (task) => {
  let affair = task.affair
  let description = task.description
  let satisfactoryDelivery = true;

  task.mails.forEach(async mail => {
    let dataEmail = {
      affair,
      description,
      mail
    }

    let opStatus = await ServiceSendingEmail(dataEmail)

    if(opStatus.message === 'The email could not be sent correctly') satisfactoryDelivery = false
    console.log(opStatus)
  })

  let sendingEmailByTask = {
    id: task.id,
    shippingStatus: satisfactoryDelivery
  }

  emailSendingStatus.push(sendingEmailByTask)
}

export const SendEmails = async () => {
  let ChosenDateConverted = new Date().toISOString().split('T')[0]
  let tasksToSend = GetTasksByCondition(ChosenDateConverted)
  
  if (tasksToSend.length === 0)  return "There are no assignments to submit on this date"

  tasksToSend.forEach(task => {
    SendEmailForTask(task)
  })

  CloseTaskNotice(emailSendingStatus)

  return "The email sending task completed successfully"
}
