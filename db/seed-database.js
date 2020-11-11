const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/realestate', {useNewUrlParser: true}).catch((err) => {
  if(err) {
    console.log('error connecting! ', err);
  }
});

const imageSchema = new mongoose.Schema({
  id: Number,
  ImageUrl: String,
  Address: String,
  Beds: Number,
  Baths: Number,
  Sqft: Number
});

const Image = mongoose.model('Image', imageSchema);

// probably going to need to shape the data and save it into our database.

var save = function(data) {

  //create an options object to shape our data
  var options = {
    id: 1,
    ImageUrl: 'https://',
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

save();
