const express = require('express')
const prices = require('../controllers/prices')
const router = express.Router()

/**
 * POST /api/v1/prices
 * @tags Prices
 * @summary Creates the specified price.
 * @returns {Price} 201 - The price was successfully created.
 * @returns 400 - The price is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.post('/prices', (req, res) => {
  if (!req.body.vehicleType) {
    res.status(400).send()
  } else if (!req.body.price) {
    res.status(400).send()
  } else {
    prices.create(req.body.vehicleType, req.body.price, (err, price) => {
      if (err) {
        res.status(500).send()
      } else {
        res.status(201).send(price)
      }
    })
  }
})

/**
 * GET /api/v1/prices/:vehicleType
 * @tags Prices
 * @summary Reads the specified price.
 * @param {string} vehicleType.params.required - The vehicle type.
 * @returns {Price} 200 - The price was successfully retrieved.
 * @returns 404 - The price was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/prices/:vehicleType', (req, res) => {
  prices.read(req.params.vehicleType, (err, price) => {
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
 * GET /api/v1/prices
 * @tags Prices
 * @summary Reads all prices.
 * @returns {array<Price>} 200 - The prices were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/prices', (req, res) => {
  prices.readAll((err, prices) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(200).send(prices)
    }
  })
})

/**
 * PUT /api/v1/prices/:vehicleType
 * @tags Prices
 * @summary Updates the specified price.
 * @param {string} vehicleType.params.required - The vehicle type.
 * @returns 204 - The price was successfully updated.
 * @returns 404 - The price was not found.
 * @returns 400 - The new price is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.put('/prices/:vehicleType', (req, res) => {
  if (!req.body.vehicleType) {
    res.status(400).send()
  } else if (!req.body.price) {
    res.status(400).send()
  } else {
    prices.update(req.params.vehicleType, req.body.vehicleType, req.body.price, (err, price) => {
      if (err) {
        res.status(500).send()
      } else if (!price) {
        res.status(404).send()
      } else {
        res.status(204).send()
      }
    })
  }
})

/**
 * DELETE /api/v1/prices/:vehicleType
 * @tags Prices
 * @summary Deletes the specified price.
 * @param {string} vehicleType.params.required - The vehicle type.
 * @returns 204 - The price was successfully updated.
 * @returns 404 - The price was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.delete('/prices/:vehicleType', (req, res) => {
  prices.delete(req.params.vehicleType, (err, price) => {
    if (err) {
      res.status(500).send()
    } else if (!price) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  })
})

module.exports = router
