const UserModel = require('../models/user')

/* Get All Users */
const getAll = (req, res) => {
  UserModel.getAll()
    .then((users) => {
      console.log(users)
      res.status(200).send(users)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Get User By Email */
const getByEmail = (email, req, res) => {
  UserModel.getByEmail(email)
    .then((user) => {
      console.log(user)
      res.status(200).send(user)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Create User */
const create = (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      console.log(user.data)
      res.status(201).send(user.data)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Update User by Id */
const update = (req, res) => {
  UserModel.update(req.params.Id)
    .then((user) => {
      console.log(user.data)
      res.status(200).send(user.data)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Remove User by Id */
const remove = (req, res) => {
  UserModel.remove(req.params.Id)
    .then(() => {
      console.log('Deleted')
      res.status(204).send()
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send('NOT FOUND')
    })
}

/* Export */
module.exports = {
  getAll,
  getByEmail,
  create,
  update,
  remove
}
