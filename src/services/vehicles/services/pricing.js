const axios = require('axios')
const config = require('../config')

function readPrice (vehicleType, callback) {
  axios.get(`http://${config.pricingService.server}:${config.pricingService.port}/api/v1/prices/${vehicleType}`)
    .then(res => {
      callback(null, res.data)
    })
    .catch(err => {
      callback(err, null)
    })
}

exports.readPrice = readPrice
