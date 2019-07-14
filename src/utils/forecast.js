/**
 * Created by Grucha on 01/07/2019.
 */
const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/a0569a2aaec9f4ee2627924f6e75e929/'+latitude+','+longitude+'?units=si';

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to find forecast for this location!',undefined)
        }
        else{
            callback(undefined,{
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                rainChance: body.currently.precipProbability
            })
        }
    })
};

module.exports = forecast;