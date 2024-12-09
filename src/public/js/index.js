const DaysCalendar = document.getElementById('daysCalendar')
const TitleCalendar = document.getElementById('titleCalendar')
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const daysSinceMonday = (day) => {
  const daysOfTheWeek = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
  };

  return daysOfTheWeek[day] - 1;
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
  };

  return daysOfTheWeek[day];
}

const renderMonth = (year, month) => {
  let daysMonth = new Date(year, month + 1, 0).getDate()
  

  let index = new Date(year, month, 1).getDay()
  let firstDay = daysOfTheWeek[index]
  let HowManyDaysPassed = daysSinceMonday(firstDay)

  let createPlace;

  // Agrego los vacios.
  for (let i = 0; i < HowManyDaysPassed; i++) {
    createPlace = document.createElement("p")
    createPlace.textContent = ""
    createPlace.classList.add("td-grid")
    DaysCalendar.appendChild(createPlace)
  }

  // Agrego los numeros
  for (var day = 1; day <= daysMonth; day++) {
    createPlace = document.createElement("p")
    createPlace.textContent = `${day}` 
    createPlace.classList.add("td-grid")
    DaysCalendar.appendChild(createPlace)
  }

  // Ultimo dia del mes
  let indexLastDayJS = new Date(year, month + 1, 0).getDate()

  // Ultimo dia del mes en string
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

let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

TitleCalendar.innerHTML = `${Months[currentMonth]} - ${currentYear}`
renderMonth(currentYear, currentMonth)

// <span class="active">5</span>