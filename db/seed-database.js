const mongoose = require('mongoose');
const helperFunctions = require('./helperFunctions');
const uri = 'mongodb://localhost/realestate';
mongoose.connect(uri, {useNewUrlParser: true}).catch((err) => {
  if(err) {
    console.log('error connecting! ', err);
  }
});

const propertySchema = new mongoose.Schema({
  id: Number,
  relatedProperties: [Number], // an array of id numbers. When query, try to find ID numbers. Find all documents that have ID numbers in this array.
  price: Number,
  streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
  Beds: Number,
  Baths: Number,
  Sqft: Number,
  imageURL: String,
  favorites: Boolean
})

//plan for seeding database: save the pictures as 1,2,3,4,5,6,7,8,9, 12,22,32,42,52,62,....
// should i try to copy over the names as well?

const Property = mongoose.model('Property', propertySchema);

// probably going to need to shape the data and save it into our database.
var save = function(entries) {
  let created = 1;
  while (created <= entries) {
    let options = helperFunctions.createRecord(created);
    var house = new Property(options);
    house.save((err) => {
      if(err) {
        console.log('error in save', err);
      } else {
        //console.log('saved in database!');
      }
    });
    created++;
  }
}
var fetch = function(callback) {
  Property.findOne({id: 1}, {id: 1, imageURL: 1, relatedProperties: 1}).exec(callback);
}
var fetchById = function(relatedProperties, callback) {
  Property.find({id: relatedProperties}, callback);
}

var getAllFavorites = function(callback) {
  Property.find({favorites: true}, callback);
}

var post = function(id, callback) {
  Property.findOne({id}, (err, data) => {
    var toggle = !data.favorites;
    Property.updateOne({id}, {favorites: toggle}, () =>{
      callback();
    })

  })
}

var resetFavorites = function(callback) {
  Property.updateMany({}, { $set: { favorites: false} }, callback);
}

module.exports = {
  save,
  fetch,
  fetchById,
  post,
  getAllFavorites,
  resetFavorites
}
