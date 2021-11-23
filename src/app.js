const path = require('path')
const express = require('express');
const hsb = require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()

//setup handlebars engine and views location
app.set('view engine', 'hbs'); 
app.set('views', viewPath)
hsb.registerPartials(partialsPath)


console.log(__dirname);
console.log(__filename);
 
//setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Christpher Tregear'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        motto: "All men are equal, but some men are more equal than others.",
        title: 'About',
        name: "Christopher Tregear"        
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }

    console.log(req.query.search)
    res.send({
        products: [] 
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Welcome to the help page!",
        title: 'Help',
        name: "Christopher Tregear"
    });
});
     
app.get('/about', (req, res) => {
    res.send("<h1>About</h1>");
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address parameter missing."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: "Request not recognised!"
    })
});
 
app.listen(3000, () => {
    console.log('Server is up on 3000');
})
