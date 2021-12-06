const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Defines a price.
 * @typedef {Price} Price
 * @property {string} vehicleType.required - The vehicle type.
 * @property {number} price.required - The renting price.
 */
class Price {
  constructor (vehicleType, price) {
    this.vehicleType = vehicleType
    this.price = price
  }
}

class Prices {
  constructor () {
    this.model = mongoose.type('Price', new Schema({
      vehicleType: {
        type: String,
        required: true,
        unique: true
      },
      price: {
        type: Number,
        required: true
      }
    }))
  }

  create (price, callback) {
    const newPrice = this.model(price)

    newPrice.save((err, price) => {
      if (err) {
        callback(err, null)
      }

      callback(null, price)
    })
  }

  read (vehicleType, callback) {
    const filter = {
      vehicleType: vehicleType
    }

    this.model.findOne(filter, (err, price) => {
      if (err) {
        callback(err, null)
      }

      callback(null, price)
    })
  }

  readAll (callback) {
    const filter = {}

    this.model.find(filter, (err, prices) => {
      if (err) {
        callback(err, null)
      }

      callback(null, prices)
    })
  }

  update (vehicleType, price, callback) {
    const filter = {
      vehicleType: vehicleType
    }

    this.model.findOneAndUpdate(filter, price, (err, price) => {
      if (err) {
        callback(err, null)
      }

      callback(null, price)
    })
  }

  delete (vehicleType, callback) {
    const filter = {
      vehicleType: vehicleType
    }

    this.model.deleteOne(filter, (err, price) => {
      if (err) {
        callback(err, null)
      }

      callback(null, price)
    })
  }
}

exports.Price = Price
exports.Prices = Prices
