const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4333e0bd80aaa5d0b82a4ccf2f9125ea&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=f'
    // using object property shorthand for url property since it has the same name as the value
    // using object destructuring to extract body property from response object since its the only property used
    request({ url, json: true }, (error, { body }) => {
        // if error exists in error argument
        if (error) {
            console.log('Unable to connect to the weather service', undefined)
        // if error exists in response argument
        } else if (body.error) {
            console.log('Unable to find location!', undefined)
        // if no error 
        } else {
            console.log(body)
            callback(undefined, body.current.weather_descriptions + ". " + "It is currently " + body.current.temperature + " out. It feels like " + 
            body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast