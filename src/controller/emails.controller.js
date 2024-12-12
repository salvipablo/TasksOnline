import {
  ServiceSendingEmail
} from "../services/emails.service.js"

import {
  ReturnTasksAccordingDate
} from "../model/tasks.model.js"

export const SendEmail = async () => {
  let ChosenDateConverted = new Date().toISOString().split('T')[0]
  let data = ReturnTasksAccordingDate(ChosenDateConverted)

  if (data.length !== 0) {
    let opStatus;

    data.forEach(async element => {
      if (ChosenDateConverted === element.noticeDate) opStatus = await ServiceSendingEmail(element)
      console.log(opStatus);
    });
  }
}
