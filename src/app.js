const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const documentDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(documentDirPath))

app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather',
    name: 'Vivek' 
  })
})

app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About Me',
    name: 'Vivek'
  })
})

app.get('/help', (req, res)=>{
  res.render('help', {
    title: 'Help',
    name: 'Vivek',
    message: 'Hi we are here to help you there'
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Please Provide an address'
    })
  }
  geocode(req.query.address, (error, {lat, lon, location} = {})=>{
    if (error) {
      return res.send({
        error
      })
    }
    forecast(lat, lon, (error, forecastData)=>{
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
    });
    })
  })
  
});

app.get('/help/*', (req, res)=>{
  res.render('404page', {
    title: '404 Page',
    message: 'Help Article not found',
    name: 'Vivek' 
  })
})

app.get('*', (req, res)=>{
  res.render('404page', {
    title: '404 Page',
    message: 'Oops it\'s 404',
    name: 'Vivek' 
  })
})

app.listen(port, ()=>{
    console.log('Server is Up on port '+ port)
});
