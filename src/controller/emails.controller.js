import {
  ServiceSendingEmail
} from "../services/emails.service.js"

export const SendEmail = () => {
  // TODO: Aqui se deberia ir a buscar a la base de datos si existem eventos para el dia actual.

  // Simulo data de email
  let data = {
    affair: 'Asunto',
    description: 'Descripcion',
    noticeTask: '2025-01-20',
    emails: [ 'salvipablo@gmail.com', 'pepeargento@yahoo.com.ar' ]
  }

  let opStatus = ServiceSendingEmail(data)

  console.log(opStatus);
}
