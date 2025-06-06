export const UserAuthorizedDB = (userInfo) => {
  try {
    console.log('UserAuthorizedDB')
    console.log(userInfo)

    if (userInfo.user !== 'psalvi') throw new Error('The user does not exist in the database')
    if (userInfo.idUser !== 1) throw new Error('The submitted user ID does not match the ID in the DB')

    return 10500
  } catch (error) {
    return 10600
  }
}