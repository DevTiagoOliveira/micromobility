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

/* Get Users by id*/
const getById = (id, res) => {
  console.log(id);
  UserModel.getById(id)
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

/* Get User By Username */
const getByUsername = (username, res) => {
  UserModel.getByUsername(username)
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

/* Update User Balance */
const updateBalance = (email, balance, res) => {
  UserModel.getByEmail(email)
    .then((user) => {
      user[0].balance = user[0].balance + balance
      UserModel.updateBalance(user[0])
        .then((user) => {
          res.status(200).send("Balance Updated for user " + email)
        })
        .catch((err) => {
          console.log('Error:' + err)
          res.status(404)
          res.send('NOT FOUND')
        })
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
  UserModel.update(req.params.id, req.body)
    .then((user) => {
      console.log(user)
      res.status(200).send(user)
    })
    .catch((err) => {
      console.log('Error:' + err)
      res.status(404)
      res.send(err)
    })
}

/* Remove User by Id */
const remove = (req, res) => {
  UserModel.remove(req.params.id)
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
  getById,
  getByEmail,
  getByUsername,
  updateBalance,
  create,
  update,
  remove
}
