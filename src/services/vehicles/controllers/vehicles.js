const { Vehicle, Vehicles } = require('../models/vehicle')

const vehicles = new Vehicles()

function create (type, isAvailable, charge, location, callback) {
  const vehicle = new Vehicle(type, isAvailable, charge, location)

  vehicles.create(vehicle, (err, vehicle) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicle)
  })
}

function read (id, callback) {
  vehicles.read(id, (err, vehicle) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicle)
  })
}

function readAll (callback) {
  vehicles.readAll((err, vehicles) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicles)
  })
}

function update (id, newType, newIsAvailable, newCharge, newLocation, callback) {
  const vehicle = new Vehicle(newType, newIsAvailable, newCharge, newLocation)

  vehicles.update(id, vehicle, (err, vehicle) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicle)
  })
}

function deleteVehicle (id, callback) {
  vehicles.delete(id, (err, vehicle) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicle)
  })
}

exports.create = create
exports.read = read
exports.readAll = readAll
exports.update = update
exports.delete = deleteVehicle
