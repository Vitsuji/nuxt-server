module.exports = {
  createCrud: function(model_name, routes_name, reference_name) {
    let content = `
'use strict'
const express = require('express')
const ${routes_name} = express.Router()
const ${model_name} = require('../../models/${model_name}')

// Get all ${model_name} in the db
${routes_name}.route('/all').get(function (req, res, next) {
  ${model_name}.find(function (err, ${reference_name}s) {
    if (err) {
      return next(new Error(err))
    }

    res.json(${reference_name}s)
  })
})

// create a ${model_name} item
${routes_name}.route('/add').post(function (req, res) {
    console.log(req.body.name);
    ${model_name}.create(
    {
      // name: req.body.name,
    },
    function (error, ${reference_name}) {
      if (error) {
        res.status(400).send('Unable to create ${model_name}')
      }
      res.status(200).json(${reference_name})
    }
  )
})

// Delete a ${model_name} item

${routes_name}.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  ${model_name}.findByIdAndRemove(id, function (err, ${reference_name}) {
    if (err) {
      return next(new Error('${model_name} was not found'))
    }
    res.json('Successfully removed')
  })
})

// perform update on ${model_name} item

${routes_name}.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  ${model_name}.findById(id, function (error, ${reference_name}) {
    if (error) {
      return next(new Error('${model_name} was not ${model_name}'))
    } else {
      ${reference_name}.name = req.body.name
      ${reference_name}.done = req.body.done

      ${model_name}.save({
        function (error, ${reference_name}) {
          if (error) {
            res.status(400).send('Unable to update ${model_name}')
          } else {
            res.status(200).json(${reference_name})
          }
        }
      })
    }
  })
})

module.exports = ${routes_name}
  `

    return content
  },
  createModelPlaceholder: function (model_name) {
    let placeholder = `
    const mongoose = require('mongoose')
    // Define collection and schema for todo item
    
    const ${model_name} = new mongoose.Schema({
      name: {
        type: String
      }
    },
      {
        collection: '${model_name}s'
      }
    )
    module.exports = mongoose.model('${model_name}', ${model_name})    
    `
    return placeholder
  }
 }
