const getData = require('./getData.js')
const mongoose = require('mongoose');
const faker = require('faker');
mongoose.connect('mongodb://localhost/realestate', {useNewUrlParser: true}).catch((err) => {
  if(err) {
    console.log('error connecting! ', err);
  }
});
// NEED TO WRITE TESTS.
// NEED TO WRITE GET REQUESTS

// need to know neighborhood of primary record
//will need a property schema
//property schema needs to be linked to the neighborhood
// needs to be linked to 12 other properties in that neighborhood. How to link this property to 12 other properties? Those 12 other properties should be in neighborhood. Neighborhood/ city.
// sometimes there is a listing agent ID.
// image portion looks good, need to tie it to neighborhood (faker has city pictures)

//property schema will just contain ID numbers. Subsequent query find the documents with those ID numbers. Do two queries to mongo. Find property, get property, have object. find all documents that hve id numbers.
// will need 100 entries. Pull id numbers from related properties

// incorporate favorites.

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
// other schema, all the related properties. Two query strings.


const Property = mongoose.model('Property', propertySchema);

// probably going to need to shape the data and save it into our database.

function createRecord(id) {
  // how do i generate the related properties?
  // can set teh bed and baths up here as variables.

  let dataObj = {
    id: id,
    // need to figue out how to turn these into id numbers?
    relatedProperties: [1,2,3,4,5], // an array of id numbers. When query, try to find ID numbers. Find all documents that have ID numbers in this array.
    price: 1000000 + Math.floor(Math.random() * 5000000),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: 'Atlanta',
    zipCode: faker.address.zipCode(),
    Beds: 2 + Math.floor(Math.random() * 3),
    Baths: 2 + Math.floor(Math.random() * 1),
    Sqft: 4000 + Math.floor(Math.random() * 2000),
    imageURL: 'https://s3-us-west-1.amazonaws.com/fec.hr/0af3ffab025f9a8a151bc4e66183d7ff-full.webp',
    favorites: false
  };

  return dataObj;
}

var save = function(entries) {
  let created = 1;
  while (created <= entries) {
    let options = createRecord(created);
    var house = new Property(options);
    house.save((err) => {
      if(err) {
        console.log('error in save', err);
      } else {
        console.log('saved in database!');
      }
    });
    created++;
  }


  // for each of our data, .save into our database.

}
var fetch = function(callback) {
  Property.find(null, {id: 1, imageURL: 1}).limit(10).exec(callback);
}

save(10);
//getData.getData();
module.exports = {
  save,
  fetch
}
