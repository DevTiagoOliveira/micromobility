const express = require('express')
const Router = express.Router()
const TripController = require('../controllers/trip')
const axios = require('axios')
const passport = require('passport')
const utils = require('../utils/utils')
const jsonwebtoken = require('jsonwebtoken')

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * POST /api/v1/micromobility/login
 * @tags login
 * @summary Do login.
 * @returns 200 - login done successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.post('/login', function(req, res, next){
  axios.get('http://users-service:1003/api/v1/user/login/' + req.body.username) 
    .then((response) => {
      if(!response) {
        res.status(401).json({success: false, msg: "Could not find user"});
      }
          
    const isValid = utils.validPassword(req.body.password, response.data[0].password, response.data[0].salt);

    if (isValid){
        const tokenObject = utils.issueJWT(response.data[0]);

        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires});
    }
    else {
        res.status(401).json({success: false, msg: "you entered the wrong password"});
    }
  }).catch(error => {
    console.log(error)
  })
});

/**
 * GET /api/v1/micromobility/trips
 * @tags Trip
 * @summary Retrieve all trips.
 * @returns 200 - Returned all trips successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/trips', passport.authenticate('jwt', {session: false}), function (req, res) {
  TripController.getAll(req, res);
})

/**
 * GET /api/v1/micromobility/trips/:id
 * @tags Trip
 * @summary Retrieve trip by id.
 * @returns 200 - Returned all trips successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/trips/:id', function (req, res) {
  TripController.getById(req, res)
})

/**
 * GET /api/v1/micromobility/trips/client/:email
 * @tags Trip
 * @summary Retrieve trips by user email.
 * @returns 200 - Returned all trips successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/trips/client/:email', function (req, res) {
  TripController.getAllByEmail(req.params.email, res)
})

/**
 * GET /api/v1/micromobility/trips/veh/:id
 * @tags Trip
 * @summary Retrieve trips by vehicle id.
 * @returns 200 - Returned all trips successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/trips/veh/:id', function (req, res) {
  TripController.getAllByVehId(req.params.id, res)
})

/**
 * GET /api/v1/micromobility/trips/vehtype/:id
 * @tags Trip
 * @summary Retrieve trips by vehicle id.
 * @returns 200 - Returned all trips successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/trips/vehtype/:type', function (req, res) {
  TripController.getAllByVehType(req.params.type, res)
})

/**
 * POST /api/v1/micromobility/trips
 * @tags Trip
 * @summary Create trip.
 * @returns 201 - Trip created successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.post('/trips', function (req, res) {
  TripController.create(req, res)
})

/**
 * PATCH /api/v1/micromobility/trips/:id
 * @tags Trip
 * @summary Update Trip.
 * @returns 200 - Trip updated successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.patch('/trips/:id', function (req, res) {
  TripController.update(req, res)
})

/**
 * DELETE /api/v1/micromobility/trips/:id
 * @tags Trip
 * @summary Delete Trip.
 * @returns 204 - Trip deleted successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.delete('/trips/:id', function (req, res) {
  TripController.remove(req, res)
})

/**
 * POST /api/v1/micromobility/register
 * @tags User
 * @summary Create user.
 * @returns 201 - User created successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.post('/register', function (req, res) {
    res.redirect(308, 'http://localhost:1003/api/v1/user/');
})

/**
 * GET /api/v1/micromobility/getUserDetails
 * @tags User
 * @summary Retrieve user by email.
 * @returns 200 - Returned user successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/getUserDetails', passport.authenticate('jwt', {session: false}), function (req, res) {
  var token = req.headers.authorization.replace("Bearer ", "")
  var decoded = jsonwebtoken.decode(token, PRIV_KEY)
  res.redirect('http://localhost:1003/api/v1/user/' + decoded.email);
})

/**
 * PATCH /api/v1/micromobility/updateUserBalance/:email
 * @tags User
 * @summary Update user balance.
 * @returns 200 - User updated successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.patch('/updateUserBalance/:email', function (req, res) {
  // Requires authentication and email should be retrieved from session
  res.redirect(308, 'http://localhost:1003/api/v1/user/balance/' + req.params.email);
})

/**
 * GET /api/v1/micromobility/vehicle/:vehId/price
 * @tags Vehicles
 * @summary Reads the price of the specified vehicle.
 * @param {string} req.params.vehId - The vehicle identifier.
 * @returns {Vehicle} 200 - The vehicle price was successfully retrieved.
 * @returns 404 - The vehicle price was not found.
 * @returns 500 - An internal service error has occurred.
 */
Router.get('/vehicle/:specVehId/price', function (req, res) {
  // Requires authentication
  res.redirect('http://localhost:1004/api/v1/vehicles/' + req.params.specVehId + '/price');
})

/**
 * GET /api/v1/micromobility/vehicle/nearest
 * @tags Vehicles
 * @summary Reads the top 3 nearest vehicle to the client.
 * @param {string} req.query.xorigin - The client xorigin.
 * @param {string} req.query.yorigin - The client yorigin.
 * @returns {array<Vehicle>} 200 - The vehicles were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
Router.get('/vehicle/nearest', async function (req, res) {
  // Requires authentication
  const response = await axios.get('http://vehicles-service:1004/api/v1/vehicles'); 
  
  for (var i = 0; i < response.data.length; i++) {
    var vehicleDistance =   await axios.get('http://shortest-path-service:1002/api/v1/shortest-path/distance?xorigin=' + req.query.xorigin + '&yorigin=' + req.query.yorigin + '&xdestination=' + response.data[i].location.longitude + '&ydestination=' + response.data[i].location.latitude); 
    response.data[i].distance = vehicleDistance.data.result;
  }

  response.data = response.data.sort(function(a, b) {
        var x = a.distance; var y = b.distance;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  })
    
  res.status(200).send(response.data.slice(0,3))
})

/**
 * GET /api/v1/micromobility/vehicle/path
 * @tags Vehicles
 * @summary Return path to specific vehicle
 * @param {string} req.query.xorigin - The client xorigin.
 * @param {string} req.query.yorigin - The client yorigin.
 * @param {string} req.query.xdestination - The vehicle xdestination.
 * @param {string} req.query.ydestination - The vehicle ydestination.
 * @returns 200 - The path was successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
Router.get('/vehicle/nearest/path', async function (req, res) {
    const response = await axios.get('http://shortest-path-service:1002/api/v1/shortest-path/?xorigin=' + req.query.xorigin + '&yorigin=' + req.query.yorigin + '&xdestination=' + req.query.xdestination + '&ydestination=' + req.query.ydestination); 
    res.status(200).send(response.data)
})

/**
 * POST /api/v1/micromobility/management/vehicle/
 * @tags Vehicles
 * @summary Creates the specified vehicle (vehicle type must exist in pricing service).
 * @returns {Vehicle} 201 - The vehicle was successfully created.
 * @returns 400 - The vehicle is invalid.
 * @returns 500 - An internal service error has occurred.
 */
Router.post('/management/vehicle/', passport.authenticate('jwt', {session: false}), function (req, res) {
  var token = req.headers.authorization.replace("Bearer ", "")
  var decoded = jsonwebtoken.decode(token, PRIV_KEY)
  if(decoded.userType == "Admin"){
    res.redirect(308, 'http://localhost:1004/api/v1/vehicles');
  }
  else
  res.status(401).json({success: false, msg: "Not Authorize to create vehicles"});
})

/**
 * POST /api/v1/micromobility/start
 * @tags Trips
 * @summary Starts Trip.
 * @returns 200 - The trip started.
 * @returns 500 - An internal service error has occurred.
 */
Router.post('/start', async function (req, res) {
  try{
    const userDetails = await axios.get('http://users-service:1003/api/v1/user/login/' + req.body.username); 
    
    if(userDetails.data[0].balance > 10){

      // Update Vehicle Status
      const getVehicle = await axios.get('http://vehicles-service:1004/api/v1/vehicles/specific/' + req.body.vehicleId); 
      getVehicle.data.isAvailable = false
      const updateVehicle = await axios.put('http://vehicles-service:1004/api/v1/vehicles/' + req.body.vehicleId, getVehicle.data); 

      // Register New Trip
      const newTrip = {}
      newTrip.transactions = {}
      newTrip.tripDetails = {}
      newTrip.tripDetails.origin = {}
      newTrip.tripDetails.origin.longitude = req.body.TripDetails.origin.longitude
      newTrip.tripDetails.origin.latitude = req.body.TripDetails.origin.latitude
      newTrip.cost = 0
      newTrip.clientEmail = req.body.clientEmail
      newTrip.vehicleId = req.body.vehicleId
      newTrip.vehicleType = req.body.vehicleType

      const createTrip = await axios.post('http://micromobility-service:1000/api/v1/micromobility/trips', newTrip)

      console.log("Trip Started.")
      res.status(200).send("Trip started with success")

    } else {
      res.status(400).send("User does not have enough balance.")
    }
  } catch(e){
    res.status(400).send("Error starting trip")
  }
})


/**
 * POST /api/v1/micromobility/running
 * @tags Trips
 * @summary Intermediate messages.
 * @returns 200 - The trip started.
 * @returns 500 - An internal service error has occurred.
 */
Router.post('/running', async function (req, res) {
  try{
    // Update Balance
    const userDetails = await axios.get('http://users-service:1003/api/v1/user/login/' + req.body.username); 
    userDetails.data[0].balance = userDetails.data[0].balance - 5
    const updatedUserDetails = await axios.patch('http://users-service:1003/api/v1/user/' + userDetails.data[0]._id, userDetails.data[0]); 

    // Update Vehicle Batery
    const getVehicle = await axios.get('http://vehicles-service:1004/api/v1/vehicles/specific/' + req.body.vehicleId); 
    getVehicle.data.charge = getVehicle.data.charge - 10
    const updateVehicle = await axios.put('http://vehicles-service:1004/api/v1/vehicles/' + req.body.vehicleId, getVehicle.data);  

    console.log("Trip Updated.")

    res.status(200).send("Trip updated with success")

  } catch(e){
    res.status(400).send("Error processing trip message")
  }
})

/**
 * POST /api/v1/micromobility/end
 * @tags Trips
 * @summary End Trip.
 * @returns 200 - The trip started.
 * @returns 500 - An internal service error has occurred.
 */
Router.post('/end', async function (req, res) {

  try{
    // Update Balance
    const userDetails = await axios.get('http://users-service:1003/api/v1/user/login/' + req.body.username); 
    userDetails.data[0].balance = userDetails.data[0].balance - 5
    const updatedUserDetails = await axios.patch('http://users-service:1003/api/v1/user/' + userDetails.data[0]._id, userDetails.data[0]); 

    // Update Vehicle Batery
    const getVehicle = await axios.get('http://vehicles-service:1004/api/v1/vehicles/specific/' + req.body.vehicleId); 
    getVehicle.data.charge = getVehicle.data.charge - 10
    getVehicle.data.isAvailable = true
    const updateVehicle = await axios.put('http://vehicles-service:1004/api/v1/vehicles/' + req.body.vehicleId, getVehicle.data);  

    // Update Trip
    /*
    NEEDS REVISION - TO DO 
    const tripDetails = await axios.get('http://micromobility-service:1000/api/v1/micromobility/trips/' + req.body.tripId);
    tripDetails.tripDetails.destination = {}
    tripDetails.tripDetails.destination.longitude = req.body.TripDetails.destination.longitude
    tripDetails.tripDetails.destination.latitude = req.body.TripDetails.destination.latitude

    const updatedTripDetails = await axios.patch('http://micromobility-service:1000/api/v1/micromobility/trips/' + req.body.tripId, tripDetails);
    */
    console.log("Trip Ended.")

    res.status(200).send("Trip ended with success")

  } catch(e){
    res.status(400).send("Error ending trip")
  }
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
Router.put('/management/vehicle/:vehId', function (req, res) {
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
Router.delete('/management/vehicle/:vehId', function (req, res) {
  // Requires authentication (Admin)
  res.redirect(308, 'http://localhost:1004/api/v1/vehicles/' + req.params.vehId);
})

/**
 * GET /api/v1/micromobility/vehicle/
 * @tags Vehicles
 * @summary Reads all vehicles.
 * @returns {array<Vehicle>} 200 - The vehicles were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
Router.get('/vehicle/', function (req, res) {
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
Router.post('/management/vehiclePrice/', function (req, res) {
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
Router.put('/management/vehiclePrice/:vehType', function (req, res) {
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
Router.delete('/management/vehiclePrice/:vehType', function (req, res) {
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
Router.get('/management/vehiclePrice/', function (req, res) {
  // Requires authentication (Admin)
  res.redirect('http://localhost:1005/api/v1/prices/');
})

/**
 * GET /api/v1/micromobility/management/activeVehicle/
 * @tags Vehicles
 * @summary Returns all active vehicles.
 * @returns {array<Vehicle>} 200 - The vehicles were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
Router.get('/management/activeVehicle/', function (req, res) {
  // Requires authentication (Admin)
  res.redirect('http://localhost:1004/api/v1/vehicles/active');
})

/**
 * GET /api/v1/micromobility/management/vehicle/bat/:bat
 * @tags Vehicles
 * @summary Returns all vehicles with charge lower than :bat.
 * @returns {array<Vehicle>} 200 - The vehicles were successfully retrieved.
 * @returns 500 - An internal service error has occurred.
 */
Router.get('/management/vehicle/bat/:bat', function (req, res) {
  // Requires authentication (Admin)
  res.redirect('http://localhost:1004/api/v1//vehicles/bat/' + req.params.bat);
})

module.exports = Router
