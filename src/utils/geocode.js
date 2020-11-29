const request = require('request')

const geoCode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYW1hbjExc3JpdmFzdGF2YSIsImEiOiJja2h0ZHNnY3IxMXgyMnFwYnA1cXA2Y29xIn0.QwjsU0KQQH1bNoom9y9srw&limit=1"

    request({url: geocodeURL, json: true} , (error, { body }) => {
        if(error){
            callback(chalk.red('असुविधा के लिए खेद है!'), undefined) // Here we can ommit specifying the value = undefined as javascript will do it automatically but not in the 'else' clause because in that case the first value has to be undefined and thus it has to be specified
        }
        else if (body.features.length === 0){
            callback(chalk.red('गलत खोज। कृपया अपने द्वारा दर्ज किए गए स्थान की जाँच करें और फिर प्रयास करें।'))
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })  
}

module.exports = geoCode