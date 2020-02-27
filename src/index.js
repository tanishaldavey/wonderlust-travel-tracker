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
let landingPageHome = $('main');
let allData, destination, trip, traveler;

signInButton.on('click', displaySignInForm);
landingPageHome.on('click', fireEventsOnMain);


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

//DOMUpdates.js file
function displaySignInForm() {
//there's already a from, don't add another

  $('#home').append(`<section id="sign-in-form">
    <form>
    <label for="user">
      <input id="user" type="text" placeholder="username" required>
    </label>
    <label for="password">
      <input id="password" type="password" placeholder="Password" required>
    </label>
    <button id="sign-in-submit" type='button'>Sign In</button>
    </form>
    <p>Admin click <a href="">here</a> to sign in.
  </section>`)
}

function signInUser() {
  let userInput = $('#user').val();
  let passwordInput = $('#password').val();
  if(passwordInput === `customer${userInput}`) {
    //Display a new page
    console.log('Do the thing');
  } else {
    alert('Your username or passowrd is not correct.')
  }
}

function fireEventsOnMain(event) {
  event.preventDefault();
  if (event.target.id === 'sign-in-submit') {
    signInUser();
  } else if (event.target.parentElement !== 'form') {
    $('#sign-in-form').remove();
  }
}
