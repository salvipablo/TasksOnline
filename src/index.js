import app from "./app.js"
import { PORT } from "./config.js"

function main () {
  try {
    app.listen(PORT)
    console.info(`Server listening on port: http://localhost:${PORT}/`)
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}.`)
  }
}

main()
