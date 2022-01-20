const express = require('express')
const axios = require('axios')
const compression = require('compression')
const logger = require('morgan')
const cors = require('cors')
const doc = require('express-jsdoc-swagger')
const bodyParser = require('body-parser')
const config = require('./config')
const monitoringRouter = require('./routes/monitoring')
const database = require('./services/database')
const messaging = require('./services/messaging')

const app = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))
app.use(logger('dev'))

doc(app)({
  info: {
    title: 'Messaging Service',
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
messaging.connect(
  () => {
    console.log('Received message')
  },
  (msgObj) => {
    if (msgObj.topicType === 'start') {
      axios.post('http://localhost:1000/api/v1/messaging/start', msgObj)
    } else if (msgObj.topicType === 'running') {
      axios.post('http://localhost:1000/api/v1/messaging/running', msgObj)
    } else if (msgObj.topicType === 'end') {
      axios.post('http://localhost:1000/api/v1/messaging/start', msgObj)
    } else {
      console.log('Unrecognized topic type' + msgObj.topicType)
    }
  }
)
