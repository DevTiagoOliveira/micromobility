const UserModel = require('../models/user')
const FormData = require('form-data')
const fs = require('fs')
const axios = require('axios')

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
const getByEmail = (email, res) => {
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
  const formData = new FormData()
  const stream = fs.createReadStream('./uploads/user-images/' + req.file.filename)
  formData.append('image', stream)
  const formHeaders = formData.getHeaders()
  axios.post('http://image-recognition-service:1001/api/v1/prediction/human', formData, {
    headers: {
      ...formHeaders
    }
  }).then((response) => {
    UserModel.create(req, response.data)
      .then((user) => {
        console.log(user.data)
        res.status(201).send(user.data)
      }).catch((err) => {
        console.log('Error:' + err)
        res.status(404)
        res.send(err)
      })
  }).catch(error => {
    console.log(error)
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
      res.send(err)
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
