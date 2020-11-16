var express = require('express');
var path = require('path');
var db = require('../db/seed-database.js')
var app = express();

app.use(express.static(path.join(__dirname,'../public')));

app.listen(3000);
console.log('listening at port 3000');

app.get('/property', (req, res) => {
  // need to query the database for property stuff.
  // the fact that this is an error first is in mongoose docs?
  db.fetch((err, data) => {
    console.log('this is data: ', data)
    res.status(200);
    // when do you JSON.stringify vs not?
    res.end(JSON.stringify(data));

  })
});

// app.post to /favorites, 