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
import Traveler from './Traveler.js'

const travlersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(data => data.travelers)

const destinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)

const tripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)

let signInButton = $('#sign-in');
let allData, destination, trip, traveler;

signInButton.on('click', signUserIn);


$(document).ready(() => {
  Promise.all([travlersData, destinationsData, tripsData])
    .then(data => {
      allData = {}
      allData.travelers = data[0];
      allData.destinations = data[1];
      allData.trips = data[2];
      return allData;
    })
    .then(allDestinations)
    .then(allTrips)
    .then(allTravelers)
})

let allDestinations = () => {
  return allData.destinations.map(destinationData => {
     destination = new Destination(destinationData)
     createDestinationCard(destination);
  });
};

let allTrips = () => {
  return allData.trips.map(tripData => {
    trip = new Trip(tripData)
  });
};

let allTravelers = () => {
  return allData.travelers.map(travelersData => {
    traveler = new Traveler(travelersData)
  });
};

//should probably be moved to a DOMupdates.js file
let createDestinationCard = (destination) => {
  $('.destination-cards').append(`<div>
    <p>${destination.name}</p>
    <img src=${destination.image} alt=${destination.alt}>
    <p>${destination.estimatedLodgingCostPerDay}</p>
    <p>${destination.estimatedFlightCostPerPerson}</p>`)
};


function signUserIn() {
  $('#home').append(`<section id="sign-in-form">
    <form>
    <label for="user">
      <input id="user" type="email" placeholder="username" required>
    </label>
    <label for="password">
      <input id="password" type="password" placeholder="Password" required>
    </label>
    <button type='submit'>Sign In</button>
    </form>
  </section>`)
  console.log("hello");
}
