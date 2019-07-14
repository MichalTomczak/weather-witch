/**
 * Created by Grucha on 12/07/2019.
 */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
   res.render('index',{
       title: 'Weather App',
       name: 'Michał Tomczak'
   })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        piesek:'Złomek',
        name: 'Michał Tomczak'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message:'Help me, help me!',
        name: 'Michał Tomczak'
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Address parameter missing!'})
    }

   geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
       console.log(error);

       if(error)return res.send({error});

       forecast(latitude,longitude,(error,{summary,temperature,rainChance}={})=>{
           if (error) return res.send({error});
           forecastData = summary + ' It is currently ' + Math.round(temperature) + ' degress out. There is a ' + rainChance + '% chance of rain.';

           res.send({
               forecast:forecastData,
               address:location
           })
       })
   });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({error: 'You must provide a search term'})
    }

    console.log(req.query);
    res.send({
        products:[]
    })
});

// 404 handlers. should always be the last
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help Article not found',
        message:'This Help article does not exist! Lucky for you we\'re going to add it in Q5',
        name: 'Michał Tomczak'
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Page not found',
        message:'Yo, this page does not exist, what are you trying to find?',
        name: 'Michał Tomczak'
    })
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
});