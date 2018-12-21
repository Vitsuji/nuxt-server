# Nuxt-server

> Server-side Nuxt.js Starter with MongoDB and a bit of Spicy CLI!

## Database and port in the config.json file

``` bash
# Change mongodb database name
$ "DB": "mongodb://localhost:27017/name_of_db"

# Chanage App Port
$ "APP_PORT": 4000

# This is where all of your api requests will be sent
$ "serverURL": "http://127.0.0.1:4000/api/"

```

## Build Setup

``` bash
# Install dependencies
$ npm install

# Serve with hot reload at localhost:4000
$ npm run dev

# Build for production and launch server
$ npm run build
$ npm start

# Generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org/guide).

## Spice Commands

``` bash

# Link Spicy as a bash executable (run as root if needed)
$ npm link

# Launch Spicy
$ spicy

```
