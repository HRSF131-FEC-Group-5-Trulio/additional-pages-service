var axios = require('axios');
const API_KEY = require('./config.js');

var options = {
  zwsid: API_KEY,
  address: '98003 Crown Terrace Rd',
  citystatezip: 'Brookings, OR 97415'
}
var url = 'http://www.zillow.com/webservice/GetSearchResults.htm'

//will need to get housing information. need to enter addresses, and git ignore the zillow id.
var getData = function() {
axios.get(url, {params: options}).then(data => {
  console.log('axios get successful! ', data);
});
}

module.exports = {getData};