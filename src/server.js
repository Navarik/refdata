import server from "./http-server"
import storage from "./storage"

// Healthchecks
server.addHealthCheck(storage.isConnected, "Storage down")

// Business logic
const findEntities =
  ({ params: { limit, offset, ...query } }) => storage.find(query, { limit, offset })
const findData =
  ({ params: { limit, offset, ...query } }) => storage.find(query, { limit, offset, view: "brief" })

server.mount("get", "/", findEntities)
server.mount("get", "/types", () => storage.schemaNames())
server.mount("get", "/schemata", req => storage.findSchema(req.params))
server.mount("get", "/schema/:name", req => storage.getSchema(req.params.name))
server.mount("get", "/data", findData)
server.mount("get", "/count", req => storage.count(req.params))

server.mount("get", "/:type", findEntities)
server.mount("get", "/:type/schema", req => storage.getSchema(req.params.type))
server.mount("get", "/:type/data", findData)
server.mount("get", "/:type/count", req => storage.count(req.params))

server.mount("get", "/:type/:id", req => storage.get(req.params.id))
server.mount("get", "/:type/:id/v/:version", req => storage.get(req.params.id, req.params.version))

export default server
