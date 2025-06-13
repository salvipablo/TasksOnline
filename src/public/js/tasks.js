const CntTasks = document.getElementById('cntTasks')
const SelViews = document.getElementById('selViews')
const calendarC = document.getElementById('calendar-container')
const CntMain = document.getElementById('cntMain')

let TASKS = []

//#region Functions
const RequestTasks = async () => {
  const { id } = JSON.parse(returnUserSession())
  const request = await fetch(`./tasks/${id}`, { method: 'GET' })
  const response = await request.json()
  TASKS = response.message
}

const RenderTasks = (filteredTasks) => {
  let cards = ''

  filteredTasks.forEach(task => {
    let mails = ''

    task.emails.forEach(mail => {
      mails += `
        <li class="mail">${mail}</li>
      `
    })

    let statusTask = task.emailsSent === true ? 'statusSent' : ''
    
    cards += `
      <div class="cntTask">
        <div class="cntTitleBtns mb-1 ${statusTask}">
          <div>
            <h2 class="taskTitle">${task.id} - ${task.affair}</h2>
          </div>
          <div>
            <a href="./updateTask.html?id=${task.id}">
              <img class="iconTask btnEdit" src="./images/edit.png" alt="edit">
            </a>
            <img class="iconTask btnDelete" name="${task.id}" src="./images/delete.png" alt="delete">
          </div>
        </div>
        <p class="mb-05">ID: ${task.id}</p>
        <p class="mb-05">Descripcion: ${task.description}</p>
        <p class="mb-05">Fecha: ${task.notice_date}</p>
        <p>Mails: </p>
        <ul class="ml-15 mb-05">
          ${mails}
        </ul>
        <p>Repeticion: ${task.time_repeat}</p>
      </div>
    `
  })

  CntTasks.innerHTML = cards
}

const ConfigureUi = () => {
  const widthBody = document.body.clientWidth
  const h2Elements = document.querySelectorAll('.taskTitle')

  if (widthBody < 768) {
    h2Elements.forEach(function(element) {
      const textoOriginal = element.textContent
      const textoAcortado = textoOriginal.length > 20 ? textoOriginal.substring(0, 20) + '...' : textoOriginal
      element.textContent = textoAcortado
    })
  }
}

const createCalendar = (year, month, filteredTasks) => {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const totalDaysInMonth = lastDayOfMonth.getDate()

  let firstDayWeek = firstDayOfMonth.getDay()

  firstDayWeek = firstDayWeek === 0 ? 6 : firstDayWeek - 1

  let lastDayWeek = lastDayOfMonth.getDay()

  lastDayWeek = lastDayWeek === 0 ? 6 : lastDayWeek - 1

  const missingDays = lastDayWeek === 6 ? 0 : 6 - lastDayWeek

  const calendarContainer = document.createElement('div')
  calendarContainer.className = 'calendar-container'

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  daysOfWeek.forEach(day => {
    const dayHeader = document.createElement('div')
    dayHeader.className = 'day-header'
    dayHeader.textContent = day
    calendarContainer.appendChild(dayHeader)
  })

  for (let i = 0; i < firstDayWeek; i++) {
    const emptyDay = document.createElement('div')
    emptyDay.className = 'day empty'

    const dayFromPreviousMonth = new Date(year, month, 0).getDate() - firstDayWeek + i + 1
    emptyDay.textContent = dayFromPreviousMonth

    calendarContainer.appendChild(emptyDay)
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dayElement = document.createElement('div')
    dayElement.className = 'day'

    const numberDiv = document.createElement('div')
    numberDiv.className = 'day-number'
    numberDiv.textContent = day
    dayElement.appendChild(numberDiv)

    const currentDate = new Date()
    if (year === currentDate.getFullYear() &&
        month === currentDate.getMonth() &&
        day === currentDate.getDate()) {
      dayElement.classList.add('today')
    }

    const tasksForDay = filteredTasks.filter(task => {
      const dateString = task.notice_date;
      const parts = dateString.split('-');
      const yearFilteredTask = parseInt(parts[0]);
      const monthFilteredTask = parseInt(parts[1]) - 1; // Restar 1 porque en JS los meses van de 0-11
      const dayFilteredTask = parseInt(parts[2]);
      const taskDate = new Date(yearFilteredTask, monthFilteredTask, dayFilteredTask);

      return taskDate.getFullYear() === year && taskDate.getMonth() === month && taskDate.getDate() === day
    })

    tasksForDay.forEach(task => {
      const taskElement = document.createElement('p')
      taskElement.className = 'task'

      const shortenedText = task.affair.length > 10 ? task.affair.substring(0, 20) + '...' : task.affair
      taskElement.textContent = shortenedText

      taskElement.title = `ID Task: ${task.id}`

      if (task.emailsSent) {
        taskElement.classList.add('sent')
      } else {
        taskElement.classList.add('pending')
      }

      dayElement.appendChild(taskElement)
    })

    calendarContainer.appendChild(dayElement)
  }

  for (let i = 1; i <= missingDays; i++) {
    const emptyDay = document.createElement('div')
    emptyDay.className = 'day empty'
    emptyDay.textContent = i // Show the first days of the next month
    calendarContainer.appendChild(emptyDay)
  }

  return calendarContainer
}

const filterTasksByYearMonth = (tasks, dataFilterTasks) => {
  return tasks.filter(task => {
    // Extraer solo el año y mes de la fecha de la tarea (primeros 7 caracteres: YYYY-MM)
    const taskYearMonth = task.notice_date.substring(0, 7)
    
    // Comparar con el filtro
    return taskYearMonth === dataFilterTasks
  })
}

const showCalendar = (year, month) => {
  if (year === undefined || month === undefined) {
    const currentDate = new Date()
    year = currentDate.getFullYear()
    month = currentDate.getMonth()
  }

  let monthFilter = month + 1 < 10 ? `0${month + 1}` : month + 1
  let dataFilterTasks = `${year}-${monthFilter}`

  const filteredTasks = filterTasksByYearMonth(TASKS, dataFilterTasks)

  if (parseInt(SelViews.value) === 2) {
    RenderTasks(filteredTasks)
    SetEventsToButtons()
  }

  const calendar = createCalendar(year, month, filteredTasks)

  const container = document.getElementById('calendar-container')
  container.innerHTML = ''
  container.appendChild(calendar)

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const calendarTitle = document.createElement('h2')
  calendarTitle.textContent = `${monthNames[month]} ${year}`
  container.insertBefore(calendarTitle, calendar)

  const controls = document.createElement('div')
  controls.className = 'calendar-controls'

  const previousButton = document.createElement('button')
  previousButton.textContent = '← Previous Month'
  previousButton.onclick = () => {
    let newMonth = month - 1
    let newYear = year
    if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    showCalendar(newYear, newMonth, TASKS)
  }

  const nextButton = document.createElement('button')
  nextButton.textContent = 'Next Month →'
  nextButton.onclick = () => {
    let newMonth = month + 1
    let newYear = year
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    }
    showCalendar(newYear, newMonth, TASKS)
  }

  controls.appendChild(previousButton)
  controls.appendChild(nextButton)

  container.insertBefore(controls, calendarTitle)
}

const DeleteTask = async (idTaskToDelete) => {
  const Request = await fetch(`./tasks/${idTaskToDelete}`, {
    method: 'DELETE',
  })

  const Response = await Request.json()

  return Response
}

const SetEventsToButtons = () => {
  const DeleteButtons = document.querySelectorAll('.btnDelete')

  DeleteButtons.forEach(btnDelete => {
    btnDelete.addEventListener('click', async function(event) {
      const imageName = event.target.getAttribute('name')

      let opStatus = await DeleteTask(imageName)

      alert(`${opStatus.message}`)

      location.reload(true)
    })
  })
}

const auth = async () => {
  const user = JSON.parse(returnUserSession())

  let Response

  if (user) {
    const Request = await fetch('./auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    Response = await Request.json()
  }

  if (Response.message !== 'User is authorized'|| !user) {
    alert('Usted no esta autorizado para realizar esta accion')
    window.location.href = './login.html'
  }
}

const returnUserSession = () => {
  return sessionStorage.getItem("LoggedInUser")
}
//#endregion

//#region Events
SelViews.addEventListener('change', () => {
  calendarC.classList.add('no-visible')
  CntMain.classList.remove('viewCalendar')
  CntTasks.classList.remove('directionColumn')
  
  if (parseInt(SelViews.value) === 1) {
    RenderTasks(TASKS)
    SetEventsToButtons()
  }

  if (parseInt(SelViews.value) === 2) {
    calendarC.classList.remove('no-visible')
    CntMain.classList.add('viewCalendar')
    CntTasks.classList.add('directionColumn')
  }

  showCalendar(undefined, undefined)
})
//#endregion

const main = async () => {
  await auth()

  await RequestTasks()

  RenderTasks(TASKS)

  SetEventsToButtons()
}

main()