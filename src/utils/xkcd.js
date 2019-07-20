const request = require('request');

const xkcd = (callback)=>{

    const urlNewest = 'https://xkcd.com/info.0.json';

    request({url:urlNewest,json:true}, (error,response,{num})=>{
        const randomComicNumber = Math.round(Math.random() * (num - 1) + 1);
        urlRandom ='http://xkcd.com/'+randomComicNumber+'/info.0.json';
        request({url:urlRandom,json:true}, (error,response,{img})=>{
            callback(img)
        })
    })
};

module.exports = xkcd;