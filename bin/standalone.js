/* eslint import/no-extraneous-dependencies: "off" */

const nodemon = require("nodemon")

require("dotenv").config()

nodemon({
  script: "src/index.js",
  exec: "babel-node",
  ext: "js json",
  ignore: "tmp",
  execArgs: [
    "--inspect=0.0.0.0:9229"
  ],
  args: [
    "--source-maps"
  ],
  legacyWatch: true
})
