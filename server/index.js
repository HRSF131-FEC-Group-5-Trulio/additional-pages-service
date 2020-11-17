var express = require('express');
var path = require('path');
var db = require('../db/seed-database.js')
var app = express();

app.use(express.static(path.join(__dirname,'../public')));

app.listen(3000);
console.log('listening at port 3000');

app.get('/property', (req, res) => {
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
app.post('/favorites', (req, res) => {
  db.post((err, data) => {
    if(err) {
      console.log('error in post: ', err);
      res.sendStatus(404);
    }
    res.json(data);
  })
});

app.get('/favorites', (req,res) => {
  db.getAllFavorites((err, data) => {
    if(err) {
      console.log('error in get: ', err);
      res.sendStatus(404);
    }
    res.json(JSON.stringify(data));
  })
});