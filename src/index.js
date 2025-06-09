import app from "./app.js"
import { ShowLog } from "./services/generals.service.js"
import { PORT } from "./config.js"
import { sequelize } from "./database/database.js"
import { TasksSchema, EmailForTaskSchema, UserSchema } from "./models/index.js"

const main = async () => {
  try {
    //La propiedad force: true es solo la primera vez para Iniciar base. O al querer empezar de 0.
    await sequelize.sync({ force: false })
    ShowLog('Database connection established successfully.', 1)

    app.listen(PORT)
    ShowLog(`Server listening on port: http://localhost:${PORT}/index.html`, 1)
  } catch (error) {
    ShowLog(`Unable to connect to the database: ${error}.`, 2)
  }
}

main()
