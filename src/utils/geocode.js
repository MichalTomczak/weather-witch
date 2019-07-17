/**
 * Created by Grucha on 01/07/2019.
 */
const request = require('request');

const geocode = (address, callback) =>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ3JycnVjaGEiLCJhIjoiY2p4aW9jYWc2MXNvYzNwbDd0eW1pOWM2YyJ9.KtUWOwa5R6RQmeK3WT2OAw&limit=1";

    request({url,json:true}, (error,{body:{features}})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined,{
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
};

module.exports = geocode;