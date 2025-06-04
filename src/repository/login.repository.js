export const SearchUserDB = (UserTryingToLogin) => {
  try {
    if (UserTryingToLogin.user !== 'psalvi') throw new Error('The submitted user does not exist.')
    if (UserTryingToLogin.password !== 'semapi419') throw new Error('The login password does not match.')

    let userFound = {
      user: UserTryingToLogin.user,
      idUser: 1
    }

    return userFound
  } catch (error) {
    if (error.message === 'The submitted user does not exist.') return 10005
    if (error.message === 'The login password does not match.') return 10006
    else return 19999
  }
}
