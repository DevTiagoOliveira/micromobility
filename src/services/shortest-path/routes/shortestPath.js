const express = require('express')
const router = express.Router()
const PathController = require('../controllers/shortestPath')

/**
 * GET /api/v1/shortest-path
 * @tags Shortest Path
 * @summary Returns the shortest path taken in consideration origin and destination location.
 * @returns 200 - Return the shortest path.
 * @returns 404 - An internal service error has occurred.
 */
router.get('/', (req, res) => {
  PathController.getShortestPath(req, res)
})

/**
 * GET /api/v1/shortest-path/distance
 * @tags Shortest Path
 * @summary Returns the shortest path distance taken in consideration origin and destination location.
 * @returns 200 - Return the shortest path.
 * @returns 404 - An internal service error has occurred.
 */
router.get('/distance', (req, res) => {
  PathController.getShortestPathDistance(req, res)
})

module.exports = router
