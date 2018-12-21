# SPICY PAGES


This directory contains your Application Views and Routes.
The framework reads all the `*.vue` files inside this directory and create the router of your application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing).

## How route requests work
``` bash
# You only have to set the api url in the config file
$ "serverURL": "http://127.0.0.1:4000/api/"

# The api file sends any request to that url.
# In this case it sends it to http://127.0.0.1:4000/api/routeName/add
# Here you have a POST request to the api, telling it to add a 'routeName' which is just a placeholder for a database model
$ api.request('POST', 'routeName/add', { name: nname })

# This 3rd argument is a JSON Data Object that you want to send to the sever
$ {name: nname}

# As you can see, the data parameter is optional (src/api/index.js file):
$ request (method, urn, data = null) {...}

# When the api sends this request it goes to the route defined in the master route file (src/route/index.js):
$ router.use('/routename', require('./routeNameRoutes'))

# And this sends it to the routeNameRoutes which then adds it to the database:
$ routeNameRoutes.route('/add').post(function (req, res) {...}

```
