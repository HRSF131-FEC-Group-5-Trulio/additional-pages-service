const mongoose = require('mongoose');
const faker = require('faker');
const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/realestate';
mongoose.connect(uri, {useNewUrlParser: true}).catch((err) => {
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


const Property = mongoose.model('Property', propertySchema);
const rootUrl = 'https://s3-us-west-1.amazonaws.com/fec.hr/'
const imageURLs = ['picture+3.webp', 'da605a0a861ae3de054b8fa4cc72e76c-full.webp', '53b836d18c606987f71ce40ae82e799b-full.webp', '0ce6300a53db0f892c5673e871aa3848-full.webp', '0af3ffab025f9a8a151bc4e66183d7ff-full.webp', '3c8f37b0e8e1410701c41d6edd013522-full.webp', '586c2bb66706fba4635ff30436e81505-full.webp', 'ecdcdb326f9b0a00de1e9e10888b3635-full.webp']

// probably going to need to shape the data and save it into our database.

function createRecord(id) {
  // how do i generate the related properties?
  // can set the bed and baths up here as variables.

  //each record on your schema should be a product page
  // wait does that mean that each thing on our schema will need to have

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
    imageURL: rootUrl + imageURLs[id%8],
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
        //console.log('saved in database!');
      }
    });
    created++;
  }


  // for each of our data, .save into our database.

}
var fetch = function(callback) {
  Property.findOne({id: 1}, {id: 1, imageURL: 1, relatedProperties: 1}).exec(callback);
}
var fetchById = function(relatedProperties, callback) {
  Property.find({id: relatedProperties}, callback);
  //{id: 1, imageURL: 1, streetAddress: 1, city: 1, state: 1, Beds: 1, Baths: 1, Sqft: 1,  }
}

var getAllFavorites = function(callback) {
  Property.find({favorites: true}, callback);
}

//will be an update function to update the data.
var post = function(id, callback) {
  Property.findOne({id}, (err, data) => {
    //console.log(data);
    //var reset = false;
    var toggle = !data.favorites;
    Property.updateOne({id}, {favorites: toggle}, () =>{
      console.log('after: ', data);
      callback();
    })

  })
}

var resetFavorites = function(callback) {
  Property.updateMany({}, { $set: { favorites: false} }, callback);
}

//save(8);
//getData.getData();
module.exports = {
  save,
  fetch,
  fetchById,
  post,
  getAllFavorites,
  resetFavorites
}
