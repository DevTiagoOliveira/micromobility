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

module.exports = router
