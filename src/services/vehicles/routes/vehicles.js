const express = require('express')
const vehicles = require('../controllers/vehicles')
const router = express.Router()

/**
 * POST /api/v1/vehicles
 * @tags Vehicles
 * @summary Creates the specified vehicle (vehicle type must exist in pricing service).
 * @returns {Vehicle} 201 - The vehicle was successfully created.
 * @returns 400 - The vehicle is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.post('/vehicles', (req, res) => {
  if (!req.body.type) {
    res.status(400).send()
  } else if (!req.body.charge) {
    res.status(400).send()
  } else if (!req.body.location) {
    res.status(400).send()
  } else {
    vehicles.create(
      req.body.type,
      req.body.isAvailable,
      req.body.charge,
      req.body.location,
      (err, vehicle) => {
        if (err) {
          res.status(500).send()
        } else if (!vehicle) {
          res.status(400).send()
        } else {
          res.status(201).send(vehicle)
        }
      })
  }
}
)

/**
 * GET /api/v1/vehicles/:id/price
 * @tags Vehicles
 * @summary Reads the price of the specified vehicle.
 * @param {string} id.params.required - The vehicle identifier.
 * @returns {Vehicle} 200 - The vehicle price was successfully retrieved.
 * @returns 404 - The vehicle price was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/vehicles/:id/price', (req, res) => {
  vehicles.readPrice(req.params.id, (err, price) => {
    if (err) {
      res.status(500).send()
    } else if (!price) {
      res.status(404).send()
    } else {
      res.status(200).send(price)
    }
  })
})

/**
 * GET /api/v1/vehicles/active
 * @tags Vehicles
 * @summary Retrieve active vehicles.
 * @returns 200 - Returned all vehicles successfully.
 * @returns 404 - An internal service error has occurred.
 */
router.get('/vehicles/active', function (req, res) {
  vehicles.getActiveVehicles((err, vehicles) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(200).send(vehicles)
    }
  })
})

/**
 * GET /api/v1/vehicles/bat/:bat
 * @tags Vehicles
 * @summary Retrieve vehicles with battery percentage lower than :bat.
 * @param {string} bat.params.required - The vehicle battery.
 * @returns 200 - Returned all vehicles successfully.
 * @returns 404 - An internal service error has occurred.
 */
router.get('/vehicles/bat/:bat', function (req, res) {
  vehicles.getVehiclesWithBatLowerThan(req.params.bat, (err, vehicles) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(200).send(vehicles)
    }
  })
})

/**
 * GET /api/v1/vehicles/:id
 * @tags Vehicles
 * @summary Reads the specified vehicle.
 * @param {string} id.params.required - The vehicle identifier.
 * @returns {Vehicle} 200 - The vehicle was successfully retrieved.
 * @returns 404 - The vehicle was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/vehicles/specific/:id', (req, res) => {
  vehicles.read(req.params.id, (err, vehicle) => {
    if (err) {
      res.status(500).send()
    } else if (!vehicle) {
      res.status(404).send()
    } else {
      res.status(200).send(vehicle)
    }
  })
})

/**
 * GET /api/v1/vehicles
 * @tags Vehicles
 * @summary Reads all vehicles.
 * @returns {array<Vehicle>} 200 - The vehicles were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/vehicles', (req, res) => {
  vehicles.readAll((err, vehicles) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(200).send(vehicles)
    }
  })
})

/**
 * PUT /api/v1/vehicles/:id
 * @tags Vehicles
 * @summary Updates the specified vehicle.
 * @param {string} id.params.required - The vehicle identifier.
 * @returns 204 - The vehicle was successfully updated.
 * @returns 404 - The vehicle was not found.
 * @returns 400 - The new vehicle is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.put('/vehicles/:id', (req, res) => {
  if (!req.body.type) {
    res.status(400).send()
  } else if (!req.body.charge) {
    res.status(400).send()
  } else if (!req.body.location) {
    res.status(400).send()
  } else {
    vehicles.update(
      req.params.id,
      req.body.type,
      req.body.isAvailable,
      req.body.charge,
      req.body.location,
      (err, vehicle) => {
        if (err) {
          if (err.isAxiosError) {
            res.status(400).send()
          } else {
            res.status(500).send()
          }
        } else if (!vehicle) {
          res.status(404).send()
        } else {
          res.status(204).send()
        }
      })
  }
})

/**
 * DELETE /api/v1/vehicles/:id
 * @tags Vehicles
 * @summary Deletes the specified vehicle.
 * @param {Vehicle} id.params.required - The vehicle identifier.
 * @returns 204 - The identifier was successfully updated.
 * @returns 404 - The identifier was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.delete('/vehicles/:id', (req, res) => {
  vehicles.delete(req.params.id, (err, vehicle) => {
    if (err) {
      res.status(500).send()
    } else if (!vehicle) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  })
})

module.exports = router
