const FrmLogin = document.getElementById('frmLogin')
const TxtUser = document.getElementById('txtUser')
const TxtPassword = document.getElementById('txtPassword')

const Login = (user) => {
  sessionStorage.clear()
  sessionStorage.setItem('LoggedInUser', JSON.stringify(user))
  window.location.href = './tasks.html'
}

FrmLogin.addEventListener('submit', async (e) => {
  e.preventDefault()

  let dataLogin = {
    user: TxtUser.value,
    password: TxtPassword.value
  }

  const Request = await fetch('../login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataLogin)
  })

  const Response = await Request.json()

  console.log(Response)

  if (Response.message === 'user successfully logged in') Login(Response.user)
  else alert(Response.message)
})