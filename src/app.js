// load in NPM package
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// creating a variable called "app" to store our express application
const app = express()

// if this app is being deployed in Heroku, it will use the Heroku port
// else, it will use the default port 3000 which is run the project locally
const port = process.env.PORT || 3000

// defining paths for express configurations
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// tell express which templating engine is being used + specify settings
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// way to customize server when serving folder of assets
app.use(express.static(publicDirectoryPath))

// setting up routes for each dynamic pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rusal Shrestha'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Rusal Shrestha'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Rusal Shrestha'
    })
})

// when hitting this URL ---> http://localhost:3000/weather?address=philadelphia
app.get('/weather', (req, res) => {
    // if no address provided in URL return error object
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    address: req.query.address,
                    location,
                    forecast: forecastData
                })
            })
        }
    })
})

// when hitting this URL ---> http://localhost:3000/products?search=games
// will log the value of the search parameter (games)
app.get('/products', (req, res) => {
    // will return if their is no search term
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // will return if their is a search term
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 pages in case the user searches for pages that have not been created
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rusal Shrestha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rusal Shrestha',
        errorMessage: 'Page not found'
    })
})

// starts up our app server on the given port
app.listen(port, () => {
    console.log("Server is up on port" + port)
})