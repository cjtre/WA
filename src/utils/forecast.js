const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88c68142cf06bf7bdeec66fc17cb6ce6&query='+ latitude + ','+ longitude
 
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            console.log(body.current.humidity)
            callback(undefined, "It is currently " + body.current.temperature + ' degrees out. There is a '+ body.current.precip + ' % chance of rain.' + '\nThe humidity is: ' + body.current.humidity)
        }
    })
}

module.exports = forecast