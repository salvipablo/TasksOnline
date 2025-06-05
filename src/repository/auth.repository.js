export const UserAuthorizedDB = (user) => {
  try {
    if (user.username !== 'psalvi') throw new Error('The user does not exist in the database')
    if (user.id !== 1) throw new Error('The submitted user ID does not match the ID in the DB')

    return 10500
  } catch (error) {
    return 10600
  }
}