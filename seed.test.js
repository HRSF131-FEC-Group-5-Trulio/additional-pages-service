const seed = require('./db/seed-database.js');
const $ = require('jquery');

test('more than one document in the database', (done) => {
seed.fetch((err, data) => {
  expect(data.length).toBeGreaterThan(0);
  done();
})
});