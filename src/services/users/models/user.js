const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model
const fs = require('fs')

/**
 * Defines a User.
 * @typedef {User} Vehicle
 * @property {string} image - The user image.
 * @property {string} genre.required - The user genre.
 * @property {string} userType.required - The user type (Admin/User).
 * @property {string} email.required - The user email.
 * @property {string} username.required - The user username.
 * @property {string} password.required - The user password.
 * @property {number} age.required - The user age.
 * @property {number} balance.required - The user money balance.
 */
const UserSchema = new Schema(
  {
    image: { type: String, required: false },
    genre: { type: String, required: true },
    age: { type: Number, required: true, min: [16, 'User must be over 16 years old'] },
    userType: { type: String, required: true , enum: ['Admin', 'Client']},
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, required: false, default: 0 }
  }
)

const UserModel = Model('User', UserSchema)

function UserDB (UserModel) {
  const service = {
    getById,
    getByEmail,
    getAll,
    create,
    update,
    remove
  }

  function getById (id) {
    return new Promise(function (resolve, reject) {
      UserModel.findById(id, function (err, user) {
        if (err) reject(err)

        resolve(user)
      })
    })
  }

  function getByEmail (email) {
    return new Promise(function (resolve, reject) {
      UserModel.find({ email: email }, function (err, user) {
        if (err) reject(err)

        resolve(user)
      })
    })
  }

  function getAll () {
    return new Promise(function (resolve, reject) {
      UserModel.find({}, function (err, users) {
        if (err) reject(err)

        resolve(users)
      })
    })
  }

  function create (req, imageRec) {
    const newUser = UserModel(req.body)
    newUser.image = req.file.filename
    newUser.age = imageRec.age
    newUser.genre = imageRec.genre
    console.log(newUser)
    return save(newUser)
  }

  function update (id, values) {
    return new Promise(function (resolve, reject) {
      UserModel.findByIdAndUpdate(id, values, function (err, user) {
        if (err) reject(err)

        resolve(user)
      })
    })
  }

  function remove (id) {
    return new Promise(function (resolve, reject) {
      UserModel.findOneAndRemove({ id: id }, function (err) {
        if (err) reject(err)

        resolve(true)
      })
    })
  }

  function save (newActivity) {
    return new Promise(function (resolve, reject) {
      newActivity.save(function (err) {
        if (err) reject(err)

        resolve('Created with success!')
      })
    })
  }

  return service
}

module.exports = UserDB(UserModel)
