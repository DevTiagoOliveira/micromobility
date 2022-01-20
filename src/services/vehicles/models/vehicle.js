const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Defines a vehicle.
 * @typedef {Vehicle} Vehicle
 * @property {string} type.required - The vehicle type.
 * @property {boolean} isAvailable.required - Whenever the vehicle is available.
 * @property {number} charge.required - The vehicle charge (between 0 and 100).
 * @property {object} location.required - The vehicle location (longitude and latitude).
 */
class Vehicle {
  constructor (type, isAvailable, charge, location) {
    this.type = type
    this.isAvailable = isAvailable
    this.charge = charge
    this.location = location
  }
}

class Vehicles {
  constructor () {
    this.model = mongoose.model('Vehicle', new Schema({
      type: {
        type: String,
        required: true,
        enum: ['Scooter', 'Bicycle']
      },
      isAvailable: {
        type: Boolean,
        required: true
      },
      charge: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      location: {
        type: Object,
        required: true
      }
    }))
  }

  create (vehicle, callback) {
    const newVehicle = this.model(vehicle)

    newVehicle.save((err, vehicle) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicle)
    })
  }

  read (id, callback) {
    this.model.findById(id, (err, vehicle) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicle)
    })
  }

  getVehiclesWithBatLowerThan (bat, callback) {
    const filter = { charge: { $lt: bat }  }

    this.model.find(filter, (err, vehicles) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicles)
    })
  }

  getActiveVehicles (callback) {
    const filter = { isAvailable: true }

    this.model.find(filter, (err, vehicles) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicles)
    })
  }

  readAll (callback) {
    const filter = {}

    this.model.find(filter, (err, vehicles) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicles)
    })
  }

  update (id, vehicle, callback) {
    this.model.findByIdAndUpdate(id, vehicle, (err, vehicle) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicle)
    })
  }

  delete (id, callback) {
    this.model.findByIdAndDelete(id, (err, vehicle) => {
      if (err) {
        callback(err, null)
      }

      callback(null, vehicle)
    })
  }
}

exports.Vehicle = Vehicle
exports.Vehicles = Vehicles
