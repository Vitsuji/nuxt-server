let mongoose = require('mongoose');
const config = require('../../configs/config')

class Database {
  constructor() {
    this._connect()
  }
_connect() {
  mongoose.connect(`${config.DB.host}:${config.DB.port}/${config.DB.db_name}`, {
    "auth": { "authSource": "admin" },
    "user": config.DB.USER,
    "pass": config.DB.PASS
  }).then(() => {
    console.log('Database connection successful')
  }).catch(err => {
    console.error('Database connection error')
    console.log(`Usr: ${config.USER}`)
  })
}
}
module.exports = new Database()
