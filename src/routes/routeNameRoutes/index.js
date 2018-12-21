
'use strict'
const express = require('express')
const routeNameRoutes = express.Router()
const RouteName = require('../../models/RouteName')

// Get all RouteName in the db
routeNameRoutes.route('/all').get(function (req, res, next) {
  RouteName.find(function (err, routenames) {
    if (err) {
      return next(new Error(err))
    }else if (routenames.length == 0) {
			res.send(null)
		}else {
			res.json(routenames)
		}
  })
})

// create a RouteName item
routeNameRoutes.route('/add').post(function (req, res) {
    console.log(req.body.name);
    RouteName.create(
    {
      name: req.body.name,
    },
    function (error, routename) {
      if (error) {
        res.status(400).send('Unable to create RouteName')
      }
      res.status(200).json(routename)
    }
  )
})

// Delete a RouteName item

routeNameRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  RouteName.findByIdAndRemove(id, function (err, routename) {
    if (err) {
      return next(new Error('RouteName was not found'))
		}else if (routename === null){
			res.send(null)
    }else {
			console.log('Route found')
			res.json('Successfully removed'+routename)
		}
  })
})

// perform update on RouteName item

routeNameRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  RouteName.findById(id, function (error, routename) {
    if (error) {
			return next(new Error('RouteName was not found'))
		}else if (routename === null) {
			res.send(null)
    } else {
      let new_name = req.body.name

			routename.updateOne({ name: new_name }, function(err, res_mongo) {
			 // Updated at most one doc, `res.modifiedCount` contains the number
			// of docs that MongoDB updated
				if (err) { return next(new Error('Could not update RouteName'))}else{
					res.json('Row Updated')
				}
			});
    }
  })
})

module.exports = routeNameRoutes
