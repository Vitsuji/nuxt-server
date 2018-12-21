let mongoose = require('mongoose');
const config = require('../../config')

class Database {
  constructor() {
    this._connect()
  }
_connect() {
  mongoose.connect(config.DB, {
    "auth": { "authSource": "admin" },
    "user": config.USER,
    "pass": config.PASS
  }).then(() => {
    console.log('Database connection successful')
  }).catch(err => {
    console.error('Database connection error')
    console.log(`Usr: ${config.USER}`)
  })
}
}
module.exports = new Database()
