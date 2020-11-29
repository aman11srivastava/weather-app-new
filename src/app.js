const path = require('path') // Not a NPM package

const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const geoCode = require('./utils/geocode')

// console.log(__dirname);
// console.log(__filename);

// console.log(path.join(__dirname, '../public/'));
const app = express()
const port = process.env.PORT || 3001

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public' );
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

// Specifying the path to the public directory for express where all the HTML/CSS is present
// Setup static directory to serve -> To render html pages kept in the public folder
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman Srivastava'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        character: 'Aman the Great',
        name: 'Aman Srivastava'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help desk. Please fire your queries here!',
        title: 'Help',
        name: 'Aman Srivastava'
    })
})

app.get('/products', (req, res) => {
    // if(!req.query.search){
    //     res.send({
    //         error: 'You must provide a search item!'
    //     })
    // }
    // else {
    //     res.send({
    //         products: []
    //     })    
    // }
    if(!req.query.search){
        return res.send({ // Using return the other res.send will not be executed.
            error: 'You must provide a search item!'
        })
    }
    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided!'
        })
    }
    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


// 404 Page should be written at the last

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help Article not found',
        title: '404',
        name: 'That was YOU bitch!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found!',
        title: '404',
        name: 'That was YOU bitch!'
    })
})


// Normal Text
// app.get('/', (req, res) => {
//     res.send('Hello Express!')
// })

// Simple object
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Aman',
//         age: 23
//     })
// })

// Array of Objects
// app.get('/weather', (req, res) => {
//     res.send([
//         {
//             fname: 'Cristiano',
//             lname: 'Ronaldo',
//             age: 35,
//             location: 'Portugal',
//             weather: '25deg'
//         },
//         {
//             fname: 'Lionel',
//             lname: 'Messi',
//             age: 33,
//             location: 'Argentina',
//             weather: '29deg'
//         },
//         {
//             fname: 'Zlatan',
//             lname: 'Ibrahimovic',
//             age: 39,
//             location: 'Sweden',
//             weather: '34deg'
//         }
//     ])
// })

// HTML
// app.get('/about', (req, res) => {
//     res.send('<h1>About page!</h1>')
// })

// abc.com
// abc.com/help
// abc.com/about


app.listen(port, () => {
    console.log('Server is running on port '+ port + '.');
})