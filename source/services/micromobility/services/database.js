const mongoose = require('mongoose')
const config = require('../config')

/**
 * Connects to the database server and sets connection behavior.
 */
function connect () {
  mongoose.connect(`mongodb://${config.database.server}:${config.database.port}/${config.database.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connection.on('connected', () => {
    console.log('Connection to the database server has been established')
  })
  mongoose.connection.on('error', (err) => {
    console.error('An error has occurred while establishing the connection to the database server', err)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Connection to the database server has been disrupted')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close()
    process.exit(0)
  })
}

exports.connect = connect
