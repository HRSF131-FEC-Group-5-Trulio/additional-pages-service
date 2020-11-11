var express = require('express');
var path = require('path');
var db = require('../db/seed-database.js')
var app = express();

app.use(express.static(path.join(__dirname,'../public')));

app.listen(3000);
console.log('listening at port 3000');