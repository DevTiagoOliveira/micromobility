const Router = require('express').Router()
const UserController = require('../controllers/user')

/**
 * GET /api/v1/user/
 * @tags User
 * @summary Retrieve all users.
 * @returns 200 - Returned all users successfully.
 * @returns 404 - Not Found.
 */
Router.get('/', function (req, res) {
  UserController.getAll(req, res)
})

/**
 * GET /api/v1/user/:email
 * @tags User
 * @summary Retrieve user by email.
 * @returns 200 - Returned user successfully.
 * @returns 404 - Not Found.
 */
Router.get('/:email', function (req, res) {
  UserController.getByEmail(req.params.email, res)
})

/**
 * POST /api/v1/user/
 * @tags User
 * @summary Create user.
 * @returns 201 - User created successfully.
 * @returns 404 - Not Found.
 */
Router.post('/', function (req, res) {
  UserController.create(req, res)
})

/**
 * PATCH /api/v1/user/:id
 * @tags User
 * @summary Update user.
 * @returns 200 - User updated successfully.
 * @returns 404 - Not Found.
 */
Router.patch('/:id', function (req, res) {
  UserController.update(req, res)
})

/**
 * DELETE /api/v1/user/:id
 * @tags User
 * @summary Delete user.
 * @returns 204 - User deleted successfully.
 * @returns 404 - Not Found.
 */
Router.delete('/:id', function (req, res) {
  UserController.remove(req, res)
})

module.exports = Router