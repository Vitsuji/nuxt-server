const express = require('express')
var cors = require('cors')
const consola = require('consola')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import config
const config = require('../config')
const host = process.env.HOST || '127.0.0.1'
const port = config.APP_PORT
const database = require('../src/database')  // import database configuration
// const todoRoutes = require('../src/routes') // import routes
app.use(cors())
app.set('port', port)


// Import and Set Nuxt.js options
let nuxtconfig = require('../nuxt.config.js')
nuxtconfig.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtconfig)

  // Build only in dev mode
  if (nuxtconfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // Use our routes
  app.use('/api', require('../src/routes'))
  // Give nuxt middleware to express
  app.use(nuxt.render)

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
    next()
  })
  
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
