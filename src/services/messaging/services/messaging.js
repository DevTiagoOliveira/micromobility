const mqtt = require('mqtt')
const config = require('../config')

/**
 * Connects to the message broker and sets connection behavior.
 */
function connect (topicMessage, messageCallback) {
  const client = mqtt.connect({
    host: config.mqtt.server,
    port: config.mqtt.port
  })

  client.on('connect', () => {
    console.log('Connection to the message broker has been established')
    client.subscribe(config.mqtt.topic + '/#')
    client.on('message', (topic, message) => {
      console.log(topicMessage + ` for topic ${topic}`)
      const obj = JSON.parse(message.toString())
      obj.topicType = topic.replace(config.mqtt.topic + '/', '')
      messageCallback(obj)
    })
  })
  client.on('error', (err) => {
    console.error('An error has occurred while establishing the connection to the message broker')
  })
  client.on('disconnected', () => {
    console.log('Connection to the message broker has been disrupted')
  })

  process.on('SIGINT', () => {
    client.end()
    process.exit(0)
  })
}

exports.connect = connect
