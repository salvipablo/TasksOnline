import { SearchUserDB } from "../repository/login.repository.js"
import { ShowLog } from '../services/generals.service.js'
import { UserAuthorizedDB  } from '../repository/auth.repository.js'

export const Login = async (req, res) => {
  try {
    const {user, password} = req.body

    let userToSearch = {
      user,
      password
    }

    let infoDB = await SearchUserDB(userToSearch)

    // Si se cumple esta condicion el usuario no existe.
    if (infoDB.statusCodeDB === 10005) throw new Error('Unauthorized user due to credential error.')

    // Si se cumple esta condicion algo pase en la base de datos y no llego la informacion.
    if (infoDB.statusCodeDB === 19999) throw new Error('An unknown error occurred while searching the database.')

    // Comparar la contraseña.
    if (infoDB.user.password !== password) throw new Error('Unauthorized user due to credential error.')

    let userToFront = {
      id: infoDB.user.id,
      username: infoDB.user.username
    }

    ShowLog("Successful login attempt", 1)

    res.status(200).send({
      message: "user successfully logged in",
      user: userToFront
    })
  } catch (error) {
    ShowLog("Error trying to log in", 2)

    if (error.message === 'Unauthorized user due to credential error.') {
      res.status(401).send({ message: error.message })
    } else {
      res.status(500).send({ message: "An error occurred and the session could not be logged in." })
    }
  }
}

export const AuthorizedUser = (req, res) => {
  try {
    const user = req.body

    let status = UserAuthorizedDB(user)

    if (status === 10600) throw new Error('Unauthorized user')

    res.status(200).send({
      message: "User is authorized",
    })
  } catch (error) {
    res.status(401).send({
      message: error.message,
    })
  }
}
