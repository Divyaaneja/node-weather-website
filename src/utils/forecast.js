const request = require('request')


const forecast=(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1a143c3be3a70ec3357cea197f88027e&query='+latitude+','+longitude
    request( { url:url,json:true }, (error,response)=>{
        if(error){
            callback('Unable to connect weather service!',undefined)
        }else if(response.body.error){
            callback('Invalid data!',undefined)
        }else{
            callback(undefined,{
                location: response.body.location.name,
                des: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                feelslike:response.body.current.feelslike,
                time:response.body.current.observation_time,
                humidity:response.body.current.humidity
            })
        }
    })

}

module.exports = forecast
