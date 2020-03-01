// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/w-icon.png'
import './images/user.svg'

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

let signInButton = $('#sign-in-submit');
let landingPageHome = $('main');
let allData, destination, trip, traveler;

signInButton.on('click', signInTraveler);
// landingPageHome.on('click', fireEventsOnMain);


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
     // createDestinationCard(destination);
  });
};

let allTrips = () => {
  return allData.trips.map(tripData => {
    trip = new Trip(tripData, allData.destinations)
    console.log(trip);
  });
};

let allTravelers = () => {
  return allData.travelers.map(travelersData => {
    traveler = new Traveler(travelersData, allData.trips)
    // console.log(traveler);
  });
};

//should probably be moved to a DOMupdates.js file
// let createDestinationCard = (destination) => {
//   $('.destination-cards').append(`<div>
//     <p>${destination.name}</p>
//     <img src=${destination.image} alt=${destination.alt}>
//     <p>${destination.estimatedLodgingCostPerDay}</p>
//     <p>${destination.estimatedFlightCostPerPerson}</p>`)
// };

//DOMUpdates.js file

function signInTraveler() {
  let userInput = $('#user').val();
  let passwordInput = $('#password').val();
  if((typeof parseInt(userInput[8])) === 'number' && passwordInput === 'travel2020') {
    //Display a new page
    console.log('Do the thing');
    createHeaderForTravelerDashboard()
    createTravlerDashboard()

  } else {
    alert('Your username or passowrd is not correct.')
  }
}

function createTravlerDashboard() {
  $('main').html(`<section class="traveler-dashboard">
      <p id="yearly-total-spent-on-trips">You've spent $total this year on trips</p>
    </section>
    <section class="display-trips">
      <h3>Pending Trips</h3>
    </section>
    <section class="display-trips">
    <h3>Upcoming Trips</h3>
    </section>
    <section class="display-trips">
    <h3>Past Trips</h3>
    </section>`)
    $('.traveler-dashboard #yearly-total-spent-on-trips').css('text-align', 'right');
}

function createHeaderForTravelerDashboard() {
  $('header section').css('width', '30%')
  $('header section').css('justify-content', 'flex-end')
  $('header section').html(`<img src="./images/user.svg" alt="profile icon">
    <p>Welcome User</p>`)
  $('header section p').css('margin-left', '-5%')

}
