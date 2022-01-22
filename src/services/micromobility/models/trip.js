const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

/**
 * Defines a Trip.
 * @typedef {Trip} Trip
 * @property {object} tripDetails - Origin and destination of trip.
 * @property {string} vehicleType.required - The vehicle type.
 * @property {string} vehicleId.required - The vehicle id.
 * @property {string} clientEmail.required - The client email.
 * @property {number} cost - The total trip cost.
 * @property {object} transactions - The list of transactions.
 */
const TripSchema = new Schema(
  {
    tripDetails: { type: Object, required: false },
    vehicleType: { type: String, required: true , enum: ['Scooter', 'Bicycle']},
    vehicleId: { type: String, required: true },
    clientEmail: { type: String, required: true },
    transactions: { type: Object, required: false },
    cost: { type: Number, required: false, default: 0 }
  }
)

const TripModel = Model('Trip', TripSchema)

function TripDB (TripModel) {
  const service = {
    getAll,
    getAllByEmail,
    getAllByVehId,
    getAllByVehType,
    getById,
    create,
    update,
    remove
  }

  function getById (id) {
    return new Promise(function (resolve, reject) {
        TripModel.findById(id, function (err, trip) {
        if (err) reject(err)

        resolve(trip)
      })
    })
  }

  function getAllByEmail (email) {
    return new Promise(function (resolve, reject) {
        TripModel.find({ clientEmail: email }, function (err, trips) {
        if (err) reject(err)

        resolve(trips)
      })
    })
  }

  function getAllByVehId (vehID) {
    return new Promise(function (resolve, reject) {
        TripModel.find({ vehicleId: vehID }, function (err, trips) {
        if (err) reject(err)

        resolve(trips)
      })
    })
  }

  function getAllByVehType (vehType) {
    return new Promise(function (resolve, reject) {
        TripModel.find({ vehicleType: vehType }, function (err, trips) {
        if (err) reject(err)

        resolve(trips)
      })
    })
  }

  function getAll () {
    return new Promise(function (resolve, reject) {
        TripModel.find({}, function (err, trips) {
        if (err) reject(err)

        resolve(trips)
      })
    })
  }

  function create (req) {
    const newTrip = TripModel(req.body)
    return save(newTrip)
  }

  function update (id, values) {
    return new Promise(function (resolve, reject) {
        TripModel.findByIdAndUpdate(id, values, function (err, trip) {
        if (err) reject(err)

        resolve(trip)
      })
    })
  }

  function remove (id) {
    return new Promise(function (resolve, reject) {
        TripModel.findOneAndRemove({ id: id }, function (err) {
        if (err) reject(err)

        resolve(true)
      })
    })
  }

  function save (newActivity) {
    return new Promise(function (resolve, reject) {
      newActivity.save(function (err) {
        if (err) reject(err)

        resolve('Created with success!')
      })
    })
  }

  return service
}

module.exports = TripDB(TripModel)
