const TripModel = require('../models/trip')

/* Get All Trips */
const getAll = (req, res) => {
    TripModel.getAll()
    .then((trips) => {
      console.log(trips)
      res.status(200).send(trips)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Get Trips By Client Email */
const getAllByEmail = (email, res) => {
    TripModel.getAllByEmail(email)
    .then((trips) => {
      console.log(trips)
      res.status(200).send(trips)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Get Trips By Vehicle Id */
const getAllByVehId = (VehId, res) => {
    TripModel.getAllByVehId(VehId)
    .then((trips) => {
      console.log(trips)
      res.status(200).send(trips)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Get Trips By Vehicle Type */
const getAllByVehType = (VehType, res) => {
    TripModel.getAllByVehType(VehType)
    .then((trips) => {
      console.log(trips)
      res.status(200).send(trips)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Create Trip */
const create = (req, res) => {
    TripModel.create(req, res.data)
      .then((trip) => {
        console.log(trip.data)
        res.status(201).send(trip.data)
      }).catch((err) => {
        console.log('Error:' + err)
        res.status(404)
        res.send(err)
      })
 
}

/* Update Trip by Id */
const update = (req, res) => {
  TripModel.update(req.params.Id)
    .then((trip) => {
      console.log(trip.data)
      res.status(200).send(trip.data)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send(err)
    })
}

/* Remove User by Id */
const remove = (req, res) => {
  TripModel.remove(req.params.Id)
    .then(() => {
      console.log('Deleted')
      res.status(204).send()
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Export */
module.exports = {
    getAll,
    getAllByEmail,
    getAllByVehId,
    getAllByVehType,
    create,
    update,
    remove
}
