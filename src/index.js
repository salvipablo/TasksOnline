import app from "./app.js"
import { ShowLog } from "./services/generals.service.js"
import { PORT } from "./config.js"

function main () {
  try {
    app.listen(PORT)
    ShowLog(`Server listening on port: http://localhost:${PORT}/index.html`, 1)
  } catch (error) {
    ShowLog(`Unable to connect to the database: ${error}.`, 2)
  }
}

main()
