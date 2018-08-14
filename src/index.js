import "babel-polyfill"
import logger from "logops"
import server from "./server"
import storage from "./storage"

const exit = (message) => {
  logger.fatal(message)
  process.exit(1)
}

if (!process.env.SERVICE_PORT) {
  exit("[Init] SERVICE_PORT environment variable is not provided")
}

const main = () => Promise
  .all([storage.init()])
  .then(() => server.start(process.env.SERVICE_PORT))
  .catch(exit)

process.on("SIGINT", () => {
  logger.warn("SIGINT received! Exiting...")
  server.stop()
  process.exit()
})

process.on("SIGHUP", () => {
  logger.warn("SIGHUP received! Restarting...")

  if (server) {
    server.stop()
  }

  main()
})

main()
