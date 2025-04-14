const CntTasks = document.getElementById('cntTasks')
const SelViews = document.getElementById('selViews')
const calendarC = document.getElementById('calendar-container')
const CntMain = document.getElementById('cntMain')

let TASKS = []

// Functions //
const RequestTasks = async () => {
  const request = await fetch(`./tasks`, {
    method: 'GET',
  })

  const response = await request.json()

  TASKS = response.message
}

const RenderTasks = (filteredTasks) => {
  let cards = ''

  filteredTasks.forEach(task => {
    let mails = ''

    task.mails.forEach(mail => {
      mails += `
        <li>${mail}</li>
      `
    });

    let statusTask = task.emailsSent === true ? 'statusSent' : ''
    
    cards += `
      <div class="cntTask">
        <div class="cntTitleBtns mb-1 ${statusTask}">
          <div>
            <h2 class="taskTitle">${task.affair}</h2>
          </div>
          <div>
            <img class="iconTask btnEdit" name="${task.id}" src="./images/edit.png" alt="edit">
            <img class="iconTask btnDelete" name="${task.id}" src="./images/delete.png" alt="delete">
          </div>
        </div>
        <p class="mb-05">Descripcion: ${task.description}</p>
        <p class="mb-05">Fecha: ${task.noticeDate}</p>
        <p>Mails: </p>
        <ul class="ml-15 mb-05">
          ${mails}
        </ul>
        <p>Repeticion: ${task.timeRepeatTask}</p>
      </div>
    `
  });

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

function createCalendar(year, month) {
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

    const tasksForDay = TASKS.filter(task => {
      const taskDate = new Date(task.noticeDate)
      return taskDate.getFullYear() === year && taskDate.getMonth() === month && taskDate.getDate() === day
    })

    tasksForDay.forEach(task => {
      const taskElement = document.createElement('p')
      taskElement.className = 'task'

      const shortenedText = task.affair.length > 10 ? task.affair.substring(0, 20) + '...' : task.affair
      taskElement.textContent = shortenedText

      taskElement.title = task.affair

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

function filterTasksByYearMonth(tasks, dataFilterTasks) {
  return tasks.filter(task => {
    // Extraer solo el año y mes de la fecha de la tarea (primeros 7 caracteres: YYYY-MM)
    const taskYearMonth = task.noticeDate.substring(0, 7)
    
    // Comparar con el filtro
    return taskYearMonth === dataFilterTasks
  })
}

function showCalendar(year, month) {
  if (year === undefined || month === undefined) {
    const currentDate = new Date()
    year = currentDate.getFullYear()
    month = currentDate.getMonth()
  }

  let monthFilter = month + 1 < 10 ? `0${month + 1}` : month + 1
  let dataFilterTasks = `${year}-${monthFilter}`
  const filteredTasks = filterTasksByYearMonth(TASKS, dataFilterTasks);

  // Muestro las cards filtradas
  if (parseInt(SelViews.value) === 2) {
    RenderTasks(filteredTasks)
    SetEventsToButtons()
  }

  // Creo el calendario
  const calendar = createCalendar(year, month)

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
  const Request = await fetch(`./${idTaskToDelete}`, {
    method: 'DELETE',
  })

  const Response = await Request.json()

  return Response;
}

const SetEventsToButtons = () => {
  const EditButtons = document.querySelectorAll('.btnEdit')
  const DeleteButtons = document.querySelectorAll('.btnDelete')

  EditButtons.forEach(btnEdit => {
    btnEdit.addEventListener('click', function(event) {
      const imageName = event.target.getAttribute('name');
      alert(`El id a editar es: ${imageName}`)
    })
  })
  
  DeleteButtons.forEach(btnDelete => {
    btnDelete.addEventListener('click', async function(event) {
      const imageName = event.target.getAttribute('name');
  
      let opStatus = await DeleteTask(imageName)
  
      alert(`${opStatus.message}`)
  
      location.reload(true);
    })
  })
}
// Functions //

// Events //
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
// Events //

const main = async () => {
  // Realizo la peticion para traer las tareas
  await RequestTasks()

  // Dibujo las tasks en pantalla
  RenderTasks(TASKS)

  // Una vez dibujadas las cards, genero los eventos para los botones.
  SetEventsToButtons()
}

main()