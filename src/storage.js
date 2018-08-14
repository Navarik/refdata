import createStorage from "@navarik/storage"
import FilesystemChangelogAdapter from "@navarik/storage-filesystem-changelog"
import logger from "logops"

const showObjName = obj => (typeof obj === "object"
  ? obj.constructor.name
  : obj.toString()
)

// Storage adapters
const schemaLog = new FilesystemChangelogAdapter({
  workingDirectory: process.env.SCHEMA_LOCATION,
  format: "json"
})

const entityLog = new FilesystemChangelogAdapter({
  workingDirectory: process.env.DATA_LOCATION,
  format: "json"
})

// Storage instance
const storage = createStorage({
  index: "default",
  log: {
    schema: schemaLog,
    entity: entityLog
  }
})

const port = {
  ...storage,

  init: async () => {
    logger.info(`[Init] schemaLog adapter: ${showObjName(schemaLog)}`)
    logger.info(`[Init] entityLog adapter: ${showObjName(entityLog)}`)

    await storage.init()
  }
}

export default port
