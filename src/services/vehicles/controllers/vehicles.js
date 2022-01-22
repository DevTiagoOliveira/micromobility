const { Vehicle, Vehicles } = require('../models/vehicle')
const pricingService = require('../services/pricing')
const vehicles = new Vehicles()

function create (type, isAvailable, charge, location, callback) {
  pricingService.readPrice(type, (err) => {
    if (err) {
      callback(null, null)
    } else {
      const vehicle = new Vehicle(type, isAvailable, charge, location)

      vehicles.create(vehicle, (err, vehicle) => {
        if (err) {
          callback(err, null)
        }

        callback(null, vehicle)
      })
    }
  })
}

function getVehiclesWithBatLowerThan (bat, callback) {
  vehicles.getVehiclesWithBatLowerThan(bat, (err, vehicles) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicles)
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

function getActiveVehicles (callback) {
  vehicles.getActiveVehicles((err, vehicles) => {
    if (err) {
      callback(err, null)
    }

    callback(null, vehicles)
  })
}

function readPrice (id, callback) {
  read(id, (err, vehicle) => {
    if (err) {
      callback(err, null)
    }

    pricingService.readPrice(vehicle.type, (err, price) => {
      if (err) {
        callback(err, null)
      }

      callback(null, {
        price: price.price
      })
    })
  })
}

function update (id, newType, newIsAvailable, newCharge, newLocation, callback) {
  pricingService.readPrice(newType, (err) => {
    if (err) {
      callback(err, null)
    } else {
      const vehicle = new Vehicle(newType, newIsAvailable, newCharge, newLocation)

      vehicles.update(id, vehicle, (err, vehicle) => {
        if (err) {
          callback(err, null)
        }

        callback(null, vehicle)
      })
    }
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
exports.readPrice = readPrice
exports.update = update
exports.delete = deleteVehicle
exports.getActiveVehicles = getActiveVehicles
exports.getVehiclesWithBatLowerThan = getVehiclesWithBatLowerThan
