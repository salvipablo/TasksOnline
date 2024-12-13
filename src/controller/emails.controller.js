import {
  ServiceSendingEmail
} from "../services/emails.service.js"

import {
  ReturnTasksAccordingDate
} from "../model/tasks.model.js"

export const SendEmail = async () => {
  let ChosenDateConverted = new Date().toISOString().split('T')[0]
  let tasksToSend = ReturnTasksAccordingDate(ChosenDateConverted)

  if (tasksToSend.length !== 0) {
    tasksToSend.forEach(task => {
      let affair = task.affair
      let description = task.description

      task.mails.forEach(async mail  => {
        let dataEmail = {
          affair,
          description,
          mail
        }

        let opStatus = await ServiceSendingEmail(dataEmail)
        console.log(opStatus)
      });
    });
  }

  if (tasksToSend.length === 0) console.log("There are no assignments to submit on this date")
}
