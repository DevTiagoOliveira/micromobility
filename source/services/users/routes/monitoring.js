const express = require('express')
const router = express.Router()

/**
 * GET /api/v1/monitoring/probe
 * @tags Monitoring
 * @summary Probes the service. Monitoring operations should use this endpoint.
 * @returns 200 - The service is running.
 */
router.get('/monitoring/probe', (req, res) => {
  res.status(200).send()
})

module.exports = router
