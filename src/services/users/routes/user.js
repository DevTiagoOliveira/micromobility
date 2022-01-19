const Router = require('express').Router()
const UserController = require('../controllers/user')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads/user-images')
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3
  }
})

/**
 * GET /api/v1/user/
 * @tags User
 * @summary Retrieve all users.
 * @returns 200 - Returned all users successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/', function (req, res) {
  UserController.getAll(req, res)
})

/**
 * GET /api/v1/user/:email
 * @tags User
 * @summary Retrieve user by email.
 * @returns 200 - Returned user successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.get('/:email', function (req, res) {
  UserController.getByEmail(req.params.email, res)
})

/**
 * PATCH /api/v1/user/balance/:email
 * @tags User
 * @summary Update user balance.
 * @returns 200 - User updated successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.patch('/balance/:email', function (req, res) {
  console.log("O valor do balance é: " + req.body.balance)
  UserController.updateBalance(req.params.email, req.body.balance, res)
})

/**
 * POST /api/v1/user/
 * @tags User
 * @summary Create user.
 * @returns 201 - User created successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.post('/', upload.single('image'), function (req, res) {
  UserController.create(req, res)
})

/**
 * PATCH /api/v1/user/:id
 * @tags User
 * @summary Update user.
 * @returns 200 - User updated successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.patch('/:id', function (req, res) {
  UserController.update(req, res)
})

/**
 * DELETE /api/v1/user/:id
 * @tags User
 * @summary Delete user.
 * @returns 204 - User deleted successfully.
 * @returns 404 - An internal service error has occurred.
 */
Router.delete('/:id', function (req, res) {
  UserController.remove(req, res)
})

module.exports = Router
