module.exports = Object.freeze({
  http: {
    server: 'localhost',
    port: 1006
  },
  database: {
    server: '127.0.0.1',
    port: 27017,
    name: 'messaging-service'
  },
  mqtt: {
    server: 'localhost',
    port: 1883,
    topic: "rental"
  }
})
