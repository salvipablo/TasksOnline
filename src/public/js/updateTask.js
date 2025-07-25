const DaysCalendar = document.getElementById('daysCalendar')
const TitleCalendar = document.getElementById('titleCalendar')
const BtnPrev = document.getElementById('btnPrev')
const BtnNext = document.getElementById('btnNext')
const SubmitFrmUpdateTask = document.getElementById('submitFrmUpdateTask')
const DateForTask = document.getElementById('dateForTask')

const Affair = document.getElementById('affair')
const Description = document.getElementById('description')
const OptionMails = document.getElementsByClassName('opMails')
const SelMails = document.getElementById('selMails')
const Times = document.getElementById('times')
const NumbRepet = document.getElementById('numbRepet')
let StatusTask = false

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let id = 0

// #region Functions
const daysSinceMonday = (day) => {
  const daysOfTheWeek = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
  }

  return daysOfTheWeek[day] - 1
}

const HowManyDaysOfWeek = (day) => {
  const daysOfTheWeek = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
  }

  return daysOfTheWeek[day]
}

const getElementDay = (day, currentDay) => {
  let createPlace = document.createElement("p")
  createPlace.textContent = `${day}` 
  createPlace.classList.add("td-grid")

  createPlace.addEventListener('click', (e) => {
    const elementActive = document.getElementsByClassName('active')
    elementActive[0].classList.remove("active")

    e.target.classList.add('active')

    chosenDate = new Date(currentYear, currentMonth, e.target.textContent)
    DateForTask.textContent = chosenDate.toISOString().split('T')[0]
  })

  if (day === currentDay) createPlace.classList.add('active')
  return createPlace
}

const renderMonth = (year, month, currentDay) => {
  DaysCalendar.innerHTML = ''
  TitleCalendar.innerHTML = `${Months[currentMonth]} - ${currentYear}`

  let daysMonth = new Date(year, month + 1, 0).getDate()

  let index = new Date(year, month, 1).getDay()
  let firstDay = daysOfTheWeek[index]
  let HowManyDaysPassed = daysSinceMonday(firstDay)

  for (let i = 0; i < HowManyDaysPassed; i++) {
    createPlace = document.createElement("p")
    createPlace.textContent = ""
    createPlace.classList.add("td-grid")
    DaysCalendar.appendChild(createPlace)
  }

  for (var day = 1; day <= daysMonth; day++) {
    DaysCalendar.appendChild(getElementDay(day, currentDay))
  }

  let indexLastDayJS = new Date(year, month + 1, 0).getDate()

  index = new Date(year, month, indexLastDayJS).getDay()
  let lastDay = daysOfTheWeek[index]

  let indexLastDay = HowManyDaysOfWeek(lastDay)
  HowManyDaysAreLeft = 7 - indexLastDay

  for (let i = 0; i < HowManyDaysAreLeft; i++) {
    nuevoElemento = document.createElement("p")
    nuevoElemento.textContent = ""
    nuevoElemento.classList.add("td-grid")
    DaysCalendar.appendChild(nuevoElemento)
  }
}

const updateTask = async (affair, description, noticeDate, mailsToSend, timeRepeat, numRepet) => {
  let timeRepeatTask = `${numRepet} ${timeRepeat}`
  let mails = []

  for (let i = 0; i < mailsToSend.length; i++) {
    if (mailsToSend[i].selected) mails.push(mailsToSend[i].value)
  }

  let updatedTask = {
    id,
    affair,
    description,
    noticeDate,
    mails,
    emailsSent: StatusTask,
    timeRepeatTask
  }

  const Request = await fetch('./tasks/', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const Response = await Request.json()

  return Response.message
}

const auth = async () => {
  const user = JSON.parse(returnUserSession())
  let isAuthorized = false

  if (user) {
    try {
      const request = await fetch('./auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const response = await request.json()
      if (response.message === 'User is authorized') {
        isAuthorized = true
      }
    } catch (error) {
      console.error('Error al verificar la autorización:', error)
    }
  }

  if (!isAuthorized) {
    alert('Usted no está autorizado para realizar esta acción')
    window.location.href = './login.html'
  }
}

const returnUserSession = () => {
  return sessionStorage.getItem("LoggedInUser")
}
//#endregion

//#region Eventss
BtnNext.addEventListener('click', () => {
  let nextMonth = currentMonth + 1 === 12 ? 0 : currentMonth + 1
  let nextYear = currentMonth + 1 === 12 ? currentYear + 1 : currentYear
  currentMonth = nextMonth
  currentYear = nextYear
  chosenDate = new Date(currentYear, currentMonth, 1)
  DateForTask.textContent = chosenDate.toISOString().split('T')[0]
  renderMonth(currentYear, currentMonth, 1)
})

BtnPrev.addEventListener('click', () => {
  let nextMonth = currentMonth - 1 === -1 ? 11 : currentMonth - 1
  let nextYear = currentMonth - 1 === -1 ? currentYear - 1 : currentYear
  currentMonth = nextMonth
  currentYear = nextYear
  chosenDate = new Date(currentYear, currentMonth, 1)
  DateForTask.textContent = chosenDate.toISOString().split('T')[0]
  renderMonth(currentYear, currentMonth, 1)
})

SubmitFrmUpdateTask.addEventListener('submit', async (e) => {
  e.preventDefault()

  let ChosenDateConverted = chosenDate.toISOString().split('T')[0]

  let opStatus = await updateTask(Affair.value, Description.value, ChosenDateConverted, OptionMails, Times.value, NumbRepet.value, StatusTask)

  alert(opStatus)

  window.location.href = './tasks.html'
})

document.addEventListener('DOMContentLoaded', async function () {
  await auth()

  const params = new URLSearchParams(window.location.search)
  id = params.get('id')

  const Request = await fetch(`./tasks/update/${id}`, {
    method: 'GET',
  })

  const Response = await Request.json()

  Affair.value = Response.message.affair
  Description.value = Response.message.description

  for (let option of SelMails.options) {
    if (Response.message.emails.includes(option.value)) option.selected = true
  }

  const [numero, unidadRaw] = Response.message.time_repeat.split(" ")
  const unidad = unidadRaw.toLowerCase()
  NumbRepet.value = parseInt(numero)
  Times.value = unidad

  DateForTask.textContent  = Response.message.notice_date

  StatusTask = Response.message.emails_sent

  chosenDate = new Date(Response.message.notice_date)
  currentDay = chosenDate.getDate() + 1
  currentMonth = chosenDate.getMonth()
  currentYear = chosenDate.getFullYear()
  
  renderMonth(currentYear, currentMonth, currentDay)
})
//#endregion

let chosenDate = new Date()
let currentDay = chosenDate.getDate()
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()