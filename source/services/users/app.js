const express = require('express')
const compression = require('compression')
const logger = require('morgan')
const cors = require('cors')
const doc = require('express-jsdoc-swagger')
const bodyParser = require('body-parser')
const config = require('./config')
const monitoringRouter = require('./routes/monitoring')
const database = require('./services/database')

const app = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))
app.use(logger('dev'))

doc(app)({
  info: {
    title: 'Users Service',
    description: 'RESTful Web API documentation.',
    version: '1.0.0'
  },
  baseDir: __dirname,
  filesPattern: [
    './routes/**/*.js',
    './models/**/*.js'
  ]
})

app.use('/api/v1', monitoringRouter)

app.use((req, res, next) => {
  res.status(404).send()
})

app.listen(config.http.port, () => {
  console.log(`Service listening at http://${config.http.server}:${config.http.port}`)
})

database.connect()
