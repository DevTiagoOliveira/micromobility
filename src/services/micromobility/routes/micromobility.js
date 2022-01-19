const express = require('express')
const router = express.Router()

/**
 * POST /api/v1/micromobility/register
 * @tags User
 * @summary Create user.
 * @returns 201 - User created successfully.
 * @returns 404 - An internal service error has occurred.
 */
router.post('/register', function (req, res) {
    res.redirect(308, 'http://localhost:1003/api/v1/user/');
})

/**
 * GET /api/v1/micromobility/getUserDetails/:email
 * @tags User
 * @summary Retrieve user by email.
 * @returns 200 - Returned user successfully.
 * @returns 404 - An internal service error has occurred.
 */
router.get('/getUserDetails/:email', function (req, res) {
  // Requires authentication and email should be retrieved from session
  res.redirect('http://localhost:1003/api/v1/user/' + req.params.email);
})

/**
 * PATCH /api/v1/micromobility/updateUserBalance/:email
 * @tags User
 * @summary Update user balance.
 * @returns 200 - User updated successfully.
 * @returns 404 - An internal service error has occurred.
 */
router.patch('/updateUserBalance/:email', function (req, res) {
  // Requires authentication and email should be retrieved from session
  res.redirect(308, 'http://localhost:1003/api/v1/user/balance/' + req.params.email);
})

/**
 * POST /api/v1/micromobility/management/vehicle/
 * @tags Vehicles
 * @summary Creates the specified vehicle (vehicle type must exist in pricing service).
 * @returns {Vehicle} 201 - The vehicle was successfully created.
 * @returns 400 - The vehicle is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.post('/management/vehicle/', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1004/api/v1/vehicles');
})

/**
 * PUT /api/v1/micromobility/management/vehicle/:vehId
 * @tags Vehicles
 * @summary Updates the specified vehicle.
 * @param {string} req.params.vehId - The vehicle identifier.
 * @returns 204 - The vehicle was successfully updated.
 * @returns 404 - The vehicle was not found.
 * @returns 400 - The new vehicle is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.put('/management/vehicle/:vehId', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1004/api/v1/vehicles/' + req.params.vehId);
})

/**
 * DELETE /api/v1/micromobility/management/vehicle/:vehId
 * @tags Vehicles
 * @summary Deletes the specified vehicle.
 * @param {Vehicle} req.params.vehId - The vehicle identifier.
 * @returns 204 - The identifier was successfully updated.
 * @returns 404 - The identifier was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.delete('/management/vehicle/:vehId', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1004/api/v1/vehicles/' + req.params.vehId);
})

/**
 * GET /api/v1/micromobility/management/vehicle/
 * @tags Vehicles
 * @summary Reads all vehicles.
 * @returns {array<Vehicle>} 200 - The vehicles were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/management/vehicle/', function (req, res) {
  // Requires authentication and email should be retrieved from session
  res.redirect('http://localhost:1004/api/v1/vehicles');
})

/**
 * POST /api/v1/micromobility/vehiclePrice/
 * @tags Prices
 * @summary Creates the specified price.
 * @returns {Price} 201 - The price was successfully created.
 * @returns 400 - The price is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.post('/management/vehiclePrice/', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1005/api/v1/prices');
})

/**
 * PUT /api/v1/micromobility/vehiclePrice/:vehType
 * @tags Prices
 * @summary Updates the specified price.
 * @param {string} req.params.vehType - The vehicle type.
 * @returns 204 - The price was successfully updated.
 * @returns 404 - The price was not found.
 * @returns 400 - The new price is invalid.
 * @returns 500 - An internal service error has occurred.
 */
router.put('/management/vehiclePrice/:vehType', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1005/api/v1/prices/' + req.params.vehType);
})

/**
 * DELETE /api/v1/micromobility/vehiclePrice/:vehType
 * @tags Prices
 * @summary Deletes the specified price.
 * @param {string} req.params.vehType - The vehicle type.
 * @returns 204 - The price was successfully updated.
 * @returns 404 - The price was not found.
 * @returns 500 - An internal service error has occurred.
 */
router.delete('/management/vehiclePrice/:vehType', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1005/api/v1/prices/' + req.params.vehType);
})

/**
 * GET /api/v1/micromobility/vehiclePrice/
 * @tags Prices
 * @summary Reads all prices.
 * @returns {array<Price>} 200 - The prices were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
router.get('/management/vehiclePrice/', function (req, res) {
  // Requires authentication (Admin)
  res.redirect('http://localhost:1005/api/v1/prices/');
})

module.exports = router
