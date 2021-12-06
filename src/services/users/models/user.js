const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const UserSchema = new Schema(
  {
    image: { type: String, required: false },
    genre: { type: String, required: true },
    age: { type: Number, required: true },
    userType: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true }
  }
)

const UserModel = Model('User', UserSchema)

function UserDB (UserModel) {
  const service = {
    getByEmail,
    getAll,
    create,
    update,
    remove
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

  function create (user) {
    const newUser = UserModel(user)
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
