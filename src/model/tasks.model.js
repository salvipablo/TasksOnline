const Tasks = []

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

export const GetTasksByCondition = (currentDate) => {
  let tasksToBeSent = []

  Tasks.forEach(element => {
    if (element.noticeDate === currentDate && !element.emailsSent) tasksToBeSent.push(element)
  });

  return tasksToBeSent
}

export const CloseTaskNotice = (emailsStatus) => {
  emailsStatus.forEach(element => {
    let task = Tasks.find(e => e.id === element.id)
    if (task && element.shippingStatus) task.emailsSent = true
  })
}
