let mongoose = require('mongoose');
const config = require('../../config')

class Database {
  constructor() {
    this._connect()
  }
_connect() {
  mongoose.connect(config.DB, {
    "useNewUrlParser": true
  }).then(() => {
    console.log('Database connection successful')
  }).catch(err => {
    console.error('Database connection error')
    // console.log(`User: ${config.USER}`)
    // console.log(`User: ${config.USER}`)
  })
}
}
module.exports = new Database()
