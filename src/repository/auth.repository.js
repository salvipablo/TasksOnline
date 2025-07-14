import { UserSchema } from "../models/users.model.js"
import { ShowLog } from "../services/generals.service.js"

export const SearchUserDB = async (UserTryingToLogin) => {
  try {
    const userFound = await UserSchema.findOne({ where: { username: UserTryingToLogin.user } })

    if (!userFound) throw new Error('The submitted user does not exist.')

    let user = {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password,
      emails: userFound.emails
    }

    return {
      statusCodeDB: 10004,
      user
    }
  } catch (error) {
    if (error.message === 'The submitted user does not exist.') return { statusCodeDB: 10005}
    else return { statusCodeDB: 19999 }
  }
}

export const UserAuthorizedDB = async (userQueryAuthorized) => {
  try {
    const userFound = await UserSchema.findOne({ where: { username: userQueryAuthorized.username } })

    if (userFound.id !== userQueryAuthorized.id) throw new Error('The submitted user ID does not match the ID in the DB')

    return 10500
  } catch (error) {
    ShowLog(error.message, 2)
    return 10600
  }
}
