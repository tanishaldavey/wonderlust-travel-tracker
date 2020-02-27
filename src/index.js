// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/w-icon.png'

import Destination from './Destination.js'
import Trip from './Trip.js'

const travlersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(data => data.travelers)

const destinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)

const tripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)

let allData, destination, trip;

$(document).ready(() => {
  Promise.all([travlersData, destinationsData, tripsData])
    .then(data => {
      allData = {}
      allData.travelers = data[0];
      allData.destinations = data[1];
      allData.trips = data[2];
      return allData;
    })
    .then(createDestinations)
    .then(createTrips)
})

let createDestinations = () => {
  allData.destinations.map(destinationData => {
     destination = new Destination(destinationData)
  });
  console.log('destinations:::', allData.destinations)
}

let createTrips = () => {
  allData.trips.map(tripData => {
    trip = new Trip(tripData)
  });
  console.log('trips::::', allData.trips);
}
