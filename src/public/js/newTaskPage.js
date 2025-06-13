const DaysCalendar = document.getElementById('daysCalendar')
const TitleCalendar = document.getElementById('titleCalendar')
const BtnPrev = document.getElementById('btnPrev')
const BtnNext = document.getElementById('btnNext')
const SubmitFrmAddTask = document.getElementById('submitFrmAddTask')
const DateForTask = document.getElementById('dateForTask')

const Affair = document.getElementById('affair')
const Description = document.getElementById('description')
const OptionMails = document.getElementsByClassName('opMails')
const Times = document.getElementById('times')
const NumbRepet = document.getElementById('numbRepet')

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let currentDay
let currentMonth
let currentYear

let chosenDate = new Date()

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

const saveTask = async (affair, description, noticeDate, mailsToSend, timeRepet, numRepet) => {
  let timeRepeatTask = `${numRepet} ${timeRepet}`
  let mails = []

  for (let i = 0; i < mailsToSend.length; i++) {
    if (mailsToSend[i].selected) mails.push(mailsToSend[i].value)
  }

  const { id } = JSON.parse(returnUserSession())

  let newTask = {
    userID: id,
    affair,
    description,
    noticeDate,
    mails,
    emailsSent: 0,
    timeRepeatTask
  }

  const Request = await fetch('../tasks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })

  const Response = await Request.json()

  return Response.message
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

//#region Eventos
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

SubmitFrmAddTask.addEventListener('submit', async (e) => {
  e.preventDefault()

  let ChosenDateConverted = chosenDate.toISOString().split('T')[0]

  let opStatus = await saveTask(Affair.value, Description.value, ChosenDateConverted, OptionMails, Times.value, NumbRepet.value)

  alert(opStatus)

  SubmitFrmAddTask.reset()
})

document.addEventListener('DOMContentLoaded', () => {
  // Verificar autorizacion
  auth()

  // Inicia el programa.
  DateForTask.textContent = chosenDate.toISOString().split('T')[0]
  currentDay = chosenDate.getDate()
  currentMonth = new Date().getMonth()
  currentYear = new Date().getFullYear()

  renderMonth(currentYear, currentMonth, currentDay)
})
//#endregion