const assert = require('assert') // N.B: Assert module comes bundled with Node.js.
const fs = require('fs')
const routes_dir = './src/routes/'
const models_dir = './src/models/'
const config = require('../configd/config.json')
//import functions
const create = require('./placeholders.js')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @function  [create_crud]
 * @returns {String} Status
 */
const route_dirfile_create = (routes_name, content, reference_name) => {
	// Create the directory for the given Route
  if (!fs.existsSync(routes_dir+routes_name)){
    fs.mkdirSync(routes_dir+routes_name)
    console.log(`Generated ${routes_name} Folder`)
  }

	//create an index.js route file inside of the route directory
  fs.writeFile(routes_dir+routes_name+'/index.js', content, function (err) {
    if (err) throw err;
    console.log(`Created Route: ${routes_name}`)
  })

	// Link newly created Route to the project
  // open the main routes file and split it by newline
  let data = fs.readFileSync(routes_dir+'index.js').toString().split("\n")
  // State the variables
  let insert_pos_route = data.indexOf('module.exports = router')
  let insert_data = [`router.use('/${reference_name}', require('./${routes_name}'))`]

  // Put data into the file and join the file
  data.splice(insert_pos_route-1, 0, insert_data[0])
  let text = data.join("\n")

  fs.writeFile(routes_dir+'index.js', text, function (err) {
    if (err) return console.log(err)
    console.log(`Routes Pointing to ${config.serverURL}${reference_name}`)
  })
}

const create_model = (name) => {
	let model_name = capitalizeFirstLetter(name)

	// Use the createModelPlaceholder to make our Model File
  let model_placeholder = create.createModelPlaceholder(model_name)

	//  create an model in the models folder
  fs.writeFile(models_dir+model_name+'.js', model_placeholder, function (err) {
    if (err) throw err;
    console.log(`Created Model: ${model_name}`)
  })
}

const create_route = (name) => {
	let model_name = capitalizeFirstLetter(name)
	let routes_name = name+'Routes'
	let reference_name = name.toLowerCase()

	let route_placeholder = create.createRoutesPlaceholder(model_name, routes_name, reference_name)

	route_dirfile_create(routes_name, route_placeholder, reference_name)
}

const create_model_and_routes = (name) => {
	create_model(name)
	create_route(name)
}

const create_crud_no_model = (name) => {
	let routes_name = name+'Routes'
  let model_name = capitalizeFirstLetter(name)
  let reference_name = name.toLowerCase()

  // Use the createCrud function to make our crud file
  let crud_content = create.createCrud(model_name, routes_name, reference_name)

	route_dirfile_create(routes_name, crud_content, reference_name)
}

const create_crud = (name) => {
  let routes_name = name+'Routes'
  let model_name = capitalizeFirstLetter(name)
  let reference_name = name.toLowerCase()

  // Use the createCrud function to make our crud file
  let crud_content = create.createCrud(model_name, routes_name, reference_name)

	create_model(name)
	route_dirfile_create(routes_name, crud_content, reference_name)
}

// Export all methods
module.exports = { create_crud, create_model, create_route, create_crud_no_model, create_model_and_routes }
