const faker = require('faker');
const seedData = require('./seed-data.js');

const createRecord = (id) => {
  let dataObj = {
    id: id,
    relatedProperties: generateRelatedProperties(id),
    price: 500000 + Math.floor(Math.random() * 1000000),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: 'California',
    zipCode: faker.address.zipCode(),
    Beds: 2 + Math.floor(Math.random() * 3),
    Baths: 2 + Math.floor(Math.random() * 1),
    Sqft: 4000 + Math.floor(Math.random() * 2000),
    imageURL: seedData.root + seedData.paths[id-1],
    favorites: false
  };

  return dataObj;
}

const NUMBER_OF_RELATED_PROPERTIES = 15;

const generateRelatedProperties = (id) => {
  return new Array(NUMBER_OF_RELATED_PROPERTIES).fill(0).map((elem, index) => id + index + 1);
}

module.exports = {createRecord};