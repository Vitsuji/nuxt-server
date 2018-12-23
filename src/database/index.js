let mongoose = require('mongoose');
const config = require('../../configs/config')
const chalk = require('chalk')

class Database {
  constructor() {
    this._connect()
  }
_connect() {
  mongoose.connect(`${config.DB.host}:${config.DB.port}/${config.DB.db_name}`, {
    "useNewUrlParser": true
  }).then(() => {
    console.log(
      chalk.green(':) Database Connection Successful')
    )
  }).catch(err => {
    console.log(
      chalk.red('x Database Connection Error')
    )
  })
}
}
module.exports = new Database()
