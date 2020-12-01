const express = require('express');
const path = require('path');
const db = require('../db/seed-database.js')
const app = express();
const router = require('./router')
const compression = require('compression')

//middleware
app.use(compression());
app.use(express.static(path.join(__dirname,'../public')));
app.use('/:id',express.static(path.join(__dirname,'../public')));

//route
app.use('/api/AdditionalListings', router.api);

module.exports = app;