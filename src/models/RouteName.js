
    const mongoose = require('mongoose')
    // Define collection and schema for todo item

    const RouteName = new mongoose.Schema({
      name: {
        type: String
      }
    },
      {
        collection: 'RouteNames'
      }
    )
    module.exports = mongoose.model('RouteName', RouteName)
