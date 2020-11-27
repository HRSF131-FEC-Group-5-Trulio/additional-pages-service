const faker = require('faker');
const seedData = require('./seed-data.js');

const createRecord = (id) => {

  // probably need an algorithm to calculate the relatedProperties Array, which will hold...15 properties?
  /*
  algorithm for related properties: get the next 15 IDs. basically fill an array with a range of id+1 to id+16.
  set that equal to related properties.
  */

  let dataObj = {
    id: id,
    // need to figue out how to turn these into id numbers?
    relatedProperties: [1,2,3,4,5], // an array of id numbers. When query, try to find ID numbers. Find all documents that have ID numbers in this array.
    price: 1000000 + Math.floor(Math.random() * 5000000),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: 'California',
    zipCode: faker.address.zipCode(),
    Beds: 2 + Math.floor(Math.random() * 3),
    Baths: 2 + Math.floor(Math.random() * 1),
    Sqft: 4000 + Math.floor(Math.random() * 2000),
    imageURL: seedData.root + seedData.path[id%8],
    favorites: false
  };

  return dataObj;
}

module.exports = {createRecord};