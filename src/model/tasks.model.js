const Tasks = [
  {
    id: 1,
    affair: 'ISO 9001 Valvulas',
    description: 'Realizar inspeccion de valvulas para ISO 9001 y control de funcionamiento',
    noticeDate: '2025-01-15',
    mails: [
      "psalvi@semapi.com.ar",
      "psalvi@semapi.com",
      "salvipablo@gmail.com"
    ]
  },
  {
    id: 2,
    affair: "Bridas AC101 6'",
    description: 'Verificar con sensor optico, la corrosion de las caras internas',
    noticeDate: '2025-02-01',
    mails: [
      "psalvi@semapi.com.ar",
      "psalvi@semapi.com"
    ]
  }
]

export const SaveTask = (task) => {
  if (!task) throw new Error('You have not submitted a task to save')
  
  Tasks.push(task)

  return {
    statusSaveBD: 10001,
    message: "The task was successfully saved to the database"
  }
}

export const ReturnTasks = () => {
  return Tasks;
}
