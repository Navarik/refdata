import logger from 'logops'
import express from 'express'
import bodyParser from 'body-parser'
import expressLogging from 'express-logging'
import cors from 'cors'
import compression from 'compression'
import Controller from './controller'

const server = express()
const healthChecks = []

// CORS
server.use(cors())

// Compression
server.use(compression())

// support application/json
server.use(bodyParser.json())
// support text
server.use(bodyParser.text())

// Logging
server.use(expressLogging(logger))

// Misc
server.disable('x-powered-by')

// Maintanance endpoints
server.get('/health', (req, res) => {
  const failedChecks = healthChecks.filter(check => !check.func())

  if (failedChecks.length) {
    res.status(500).json({
      status: 'error',
      details: failedChecks.map(check => check.message)
    })
  } else {
    res.json({ status: 'ok' })
  }
})

// Module API
server.addHealthCheck = (func, message) => healthChecks.push({ func, message })
server.mount = (method, route, ...args) => {
  const controller = new Controller(...args)
  server[method](route, async (req, res) => controller.run(req, res))
}

server.start = (port) => new Promise((resolve) => {
  server.$nativeHttpServer = server.listen(
    port,
    () => {
      logger.info(`HTTP server listening on port ${port}`)
      resolve()
    }
  )
})

server.stop = () => new Promise((resolve) => {
  if (!server.$nativeHttpServer) {
    resolve()
  }

  server.$nativeHttpServer.close(() => {
    logger.info(`Stopped HTTP server on port ${port}`)
    resolve()
  })
})

export default server
