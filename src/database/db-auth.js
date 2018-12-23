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
    console.log(
      chalk.green(':) Database Connection Successful')
    )
  }).catch(err => {
    console.log(
      chalk.red('x Database Connection Error')
    )
    console.log(`Usr: ${config.DB.USER}`)
  })
}
}
module.exports = new Database()
