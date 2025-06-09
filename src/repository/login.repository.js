import { UserSchema } from "../models/users.model.js"

export const SearchUserDB = async (UserTryingToLogin) => {
  try {
    const userFound = await UserSchema.findOne({ where: { username: UserTryingToLogin.user } })
    
    if (!userFound) throw new Error('The submitted user does not exist.')

    let user = {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password
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
