const chalk = require('chalk')
const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const weatherForecastURL = "http://api.weatherstack.com/current?access_key=febbfae6bb59b28bf03946045d0fb1bc&query="+ encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) +"&units=m"

    request({url: weatherForecastURL, json: true}, (error, { body }) => {
        if(error){
            callback(chalk.red('Cannot connect to Weather Services! Please check after sometime.'))
        }
        else if(body.error){
            callback(chalk.red('Unable to find location!'))
        }
        else{
            callback(undefined, {
                placename: body.location.name,
                temperature : body.current.temperature,
                Rainchance:  body.current.precip     
            })
        }
    })
}

module.exports = forecast
