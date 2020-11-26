import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

//need to slice out the id from the url here and pass it in as props.
var urlArray = window.location.href.split('/');
var id = urlArray[urlArray.length - 2]
console.log('this is id: ',  id)

ReactDOM.render(<App id={id}/>, document.getElementById('app_AdditionalListings'));