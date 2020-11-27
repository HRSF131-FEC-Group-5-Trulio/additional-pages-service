var express = require('express');
var path = require('path');
var db = require('../db/seed-database.js')
var app = express();
var bodyParser = require('body-parser')

//app.use(express.static(path.join(__dirname,'../public')));

// adjust the routes to include a req.params.id
app.use(express.static(path.join(__dirname,'../public')));
app.use('/:id',express.static(path.join(__dirname,'../public')));

app.use(bodyParser.json());

app.get('/api/AdditionalListings/:id/property', (req, res) => {
  // need to fetch req.params.id
  db.fetch((err, data) => {
    if(err) {
      console.log('error in getproperty: ', err);
      res.sendStatus(404);
    }
    console.log('this is data: ', data)
      db.fetchById(data.relatedProperties, (err, properties) => {
        console.log('in fetchbyId')
        res.json(JSON.stringify(properties));
      });
  })
});

// app.post to /favorites,
app.post('/api/AdditionalListings/:id/favorites', (req, res) => {
  // get the id sent in somehow.
  //console.log('in /favorites route: ',req.params.id)
  db.post(+req.params.id, (err, data) => {
    if(err) {
      console.log('error in post: ', err);
      res.sendStatus(404);
    }
    res.json(data);
  })
});

app.get('/api/AdditionalListings/favorites', (req,res) => {
  db.getAllFavorites((err, data) => {
    if(err) {
      console.log('error in get: ', err);
      res.sendStatus(404);
    }
    res.json(JSON.stringify(data));
  })
});
app.post('/api/AdditionalListings/resetFavorites', (req, res) => {
  db.resetFavorites((err, data) => {
    if(err) {
      console.log('error resetting!!', err);
      res.sendStatus(404);
    }
    res.status(200);
    res.end();
  })
});
app.listen(3003);
console.log('listening at port 3003');