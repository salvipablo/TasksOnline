import { SearchUserDB } from "../repository/login.repository.js"
import { ShowLog } from '../services/generals.service.js'

export const Login = (req, res) => {
  try {
    const {user, password} = req.body

    let userToSearch = {
      user,
      password
    }

    let status = SearchUserDB(userToSearch)

    if (status === 10005) throw new Error('Unauthorized user due to credential error.')
    if (status === 10006) throw new Error('Unauthorized user due to credential error.')
    if (status === 19999) throw new Error('An unknown error occurred while searching the database.')

    ShowLog("Successful login attempt", 1)

    res.status(200).send({
      message: "user successfully logged in",
      user: status
    })
  } catch (error) {
    ShowLog("Error trying to log in", 2)

    console.log(error.message)

    if (error.message === 'Unauthorized user due to credential error.') {
      res.status(401).send({ message: error.message })
    } else {
      res.status(500).send({ message: "An error occurred and the session could not be logged in." })
    }
  }
}
