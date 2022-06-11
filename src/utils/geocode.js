const request = require('request')

// reusable function (bc of the async callback pattern) which you can now use as many times as you need
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnVzYWxzOTgiLCJhIjoiY2tiemp6djhkMHZqcTJxcGtpb3RwNHlwaCJ9.jfDo8jSGFdhlFz_cORhu-A&limit=1' 
    // using object property shorthand for url property since it has the same name as the value
    // using object destructuring to extract 'body' property from response object since its the only property used
    request({ url, json: true}, (error, { body }) => {
        // if error exists 
        if (error) {
            // error: "Unable to connect..."
            // response: undefined
            callback("Unable to connect to location services!", undefined)
        // if response is empty ()
        } else if (body.features.length === 0) {
            // error: "Unable to find location..."
            // response: undefined
            callback('Unable to find location. Try another search.', undefined)
        // return only certain values from the response
        } else {
            // error: undefined
            // response: contains data from API call
            callback(undefined, {
                longitute: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode