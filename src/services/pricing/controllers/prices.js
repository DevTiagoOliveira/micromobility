const { Price, Prices } = require('../models/price')

const prices = new Prices()

function create (vehicleType, priceValue, callback) {
  const price = new Price(vehicleType, priceValue)

  prices.create(price, (err, price) => {
    if (err) {
      callback(err, null)
    }

    callback(null, price)
  })
}

function read (vehicleType, callback) {
  prices.read(vehicleType, (err, price) => {
    if (err) {
      callback(err, null)
    }

    callback(null, price)
  })
}

function readAll (callback) {
  prices.readAll((err, prices) => {
    if (err) {
      callback(err, null)
    }

    callback(null, prices)
  })
}

function update (vehicleType, newVehicleType, newPrice, callback) {
  const price = new Price(newVehicleType, newPrice)

  prices.update(vehicleType, price, (err, price) => {
    if (err) {
      callback(err, null)
    }

    callback(null, price)
  })
}

function deletePrice (vehicleType, callback) {
  prices.delete(vehicleType, (err, price) => {
    if (err) {
      callback(err, null)
    }

    callback(null, price)
  })
}

exports.create = create
exports.read = read
exports.readAll = readAll
exports.update = update
exports.delete = deletePrice
