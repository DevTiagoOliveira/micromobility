module.exports = Object.freeze({
  http: {
    server: 'localhost',
    port: 1000
  },
  database: {
    server: 'database',
    port: 27017,
    name: 'micromobility-service'
  },
  shortestPathService: {
    server: 'localhost',
    port: 1002
  },
  usersService: {
    server: 'users-service',
    port: 1003
  },
  vehiclesService: {
    server: 'vehicles-service',
    port: 1004
  },
  messagingService: {
    server: 'messaging-service',
    port: 1006
  }
})
