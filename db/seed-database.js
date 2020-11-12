const getData = require('./getData.js')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/realestate', {useNewUrlParser: true}).catch((err) => {
  if(err) {
    console.log('error connecting! ', err);
  }
});
// need to know neighborhood of primary record
//will need a property schema
//property schema needs to be linked to the neighborhood
// needs to be linked to 12 other properties in that neighborhood. How to link this property to 12 other properties? Those 12 other properties should be in neighborhood. Neighborhood/ city.
// sometimes there is a listing agent ID.
// image portion looks good, need to tie it to neighborhood (faker has city pictures)

const propertySchema = new mongoose.Schema({
  id: Number,
  neighborhood: String,
  relatedProperties: [{type: Schema.Types.ObjectId, ref: 'Property'}],
  listingAgentID: String

})

const imageSchema = new mongoose.Schema({
  id: Number,
  imageURL: String,
  Address: String,
  Beds: Number,
  Baths: Number,
  Sqft: Number,
  propertyId: {type: Schema.Types.ObjectId, ref: 'Property' }
});

const Image = mongoose.model('Image', imageSchema);

// probably going to need to shape the data and save it into our database.

var save = function(data) {

  //create an options object to shape our data
  var options = {
    id: 1,
    Address: 'Abbey Lane',
    Beds: 2,
    Baths: 2,
    Sqft: 5000
  }

  // for each of our data, .save into our database.
  var house = new Image(options);
  house.save((err) => {
    if(err) {
      console.log('error in save', err);
    } else {
      console.log('saved in database!');
    }
  });
}

//save();
//getData.getData();
