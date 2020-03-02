import $ from 'jquery';
//STYLESHEETS
import './css/base.scss';
import './css/styles.scss';
//CLASSES
import Destination from './Destination.js'
import Trip from './Trip.js'
import Traveler from './Traveler.js'
//IMAGES USED IN THE INDEX
import './images/w-icon.png'
import './images/user.svg'
//FUNCTIONS FROM DOMUPDATES



const travlersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(data => data.travelers)
  .catch(error => console.log(error))

const destinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)
  .catch(error => console.log(error))

const tripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)
  .catch(error => console.log(error))

const signInButton = $('#sign-in-submit');
const adminLogIn = $('#admin-log-in');
let allData, destination, trip, traveler;

signInButton.on('click', signInTraveler);
adminLogIn.on('click', displayAdminLogInScreen);

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
     return destination = new Destination(destinationData)
     // createDestinationCard(destination);
  });
};

let allTrips = () => {
  return allData.trips.map(tripData => {
    return trip = new Trip(tripData, allData.destinations)
    // console.log(trip);
  });
};

let allTravelers = () => {
  return allData.travelers.map(travelersData => {
    return traveler = new Traveler(travelersData, allData.trips)
  });
};

let updateTravelerProperties = () => {
  let updatedTravelers = [];
  allTravelers().forEach(traveler => {
    traveler.getPastTrips();
    updatePastTripProperties(traveler);
    traveler.getPendingTrips();
    updatePendingTripProperties(traveler)
    traveler.getApprovedUpcomingTrips();
    updateUpcomingTripProperties(traveler);
    // traveler.getTotalCostOfTrip(); //This is breaking EVERYTHING!!!
    updatedTravelers.push(traveler)
  });
  return updatedTravelers;
}

let updatePastTripProperties = (user) => {
  let updatedPastTrips = [];
  user.pastTrips.forEach(trip => {
    trip = new Trip(trip, allData.destinations);
    trip.getDestinationName()
    updatedPastTrips.push(trip)
  })
  return user.pastTrips = updatedPastTrips;
}

let updatePendingTripProperties = (user) => {
  let updatedPendingTrips = [];
  user.pendingTrips.forEach(trip => {
    trip = new Trip(trip, allData.destinations);
    trip.getDestinationName()
    updatedPendingTrips.push(trip);
  })
  return user.pendingTrips = updatedPendingTrips;
}

let updateUpcomingTripProperties = (user) => {
  let updatedUpcomingTrips = [];
  user.upcomingTrips.forEach(trip => {
    trip = new Trip(trip, allData.destinations);
    trip.getDestinationName()
    updatedUpcomingTrips.push(trip);
  })
  return user.upcomingTrips = updatedUpcomingTrips;
}

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
  let userId = userInput.slice(8);
  let travelers = updateTravelerProperties();
  let currentTraveler;
  if ((typeof parseInt(userInput[8])) === 'number' && passwordInput === 'travel2020') {
    currentTraveler = travelers[userId - 1];
    createHeaderForTravelerDashboard(currentTraveler)
    createTravelerDashboard(currentTraveler)
    insertPastTrips(currentTraveler);
    insertUpcomingTrips(currentTraveler);
    insertPendingTrips(currentTraveler);
  } else {
    alert('Your username or passowrd is not correct.')
  }
}

function createTravelerDashboard(traveler) {
  $('main').html(`<section class="traveler-dashboard">
      <p>$total spent this year on trips</p>
      <button>Book New Trip<button>
    </section>
    <section class="display-trips pending-trips">
      <h3>Pending Trips</h3>
      <section class="trip-info">
      </section>
    </section>
    <section class="display-trips upcoming-trips">
    <h3>Upcoming Trips</h3>
      <section class="trip-info">
      </section>
    </section>
    <section class="display-trips past-trips">
    <h3>Past Trips</h3>
      <section class="trip-info">
      </section>
    </section>`)
    $('.traveler-dashboard #yearly-total-spent-on-trips').css('text-align', 'right');
    $('main').css('height', '100vh');
}

function createHeaderForTravelerDashboard(traveler) {
  $('header section').css('width', '30%')
  $('header section').css('justify-content', 'flex-end')
  $('header section').html(`<img src="./images/user.svg" alt="profile icon">
    <p>${traveler.name}</p>`)
  $('header section p').css('margin-left', '-5%')
}

function insertPastTrips(traveler) {
  if (traveler.pastTrips.length !== 0) {
    traveler.pastTrips.forEach(trip => {
      $('.past-trips .trip-info').append(`<div>
          <p>${trip.tripDestinationName}</p>
          <p>${trip.date}</p>
        </div>`)
    });
  } else {
    $('.past-trips').append(`<p>You don't have any past trips.</p>`).css('text-align', 'center');
  }
}
function insertUpcomingTrips(traveler) {
  if (traveler.upcomingTrips.length !== 0) {
    traveler.upcomingTrips.forEach(trip => {
      $('.upcoming-trips .trip-info').append(`<div>
          <p>${trip.tripDestinationName}</p>
          <p>${trip.date}</p>
        </div>`)
    });
  } else {
    $('.upcoming-trips').append(`<p>You don't have any upcoming trips.</p>`).css('text-align', 'center');
  }
}
function insertPendingTrips(traveler) {
  if (traveler.pendingTrips.length !== 0) {
    traveler.pendingTrips.forEach(trip => {
      $('.pending-trips .trip-info').append(`<div>
          <p>${trip.tripDestinationName}</p>
          <p>${trip.date}</p>
        </div>`)
    });
  } else {
    $('.pending-trips').append(`<p>You don't have any pending trips.</p>`).css('text-align', 'center');
  }
}

function displayAdminLogInScreen(event) {
  event.preventDefault();
  $('h1').text('Wonderland Admin Login Page')
  $('#user').attr('placeholder', 'admin username')
  $('main h3').remove();
  $('#sign-in-form h2').remove();
  $('#sign-in-form p').remove();
  $('#sign-in-form button').remove();
  $('#sign-in-form').append(`<button id="admin-sign-in" type='button'>Sign In</button>`)
  $('main').css('background', '#7b8a56')
  $('h1').css('font-size', '4em');
  $('#sign-in-form').css('background', '#cad0bb');
  $('#sign-in-form').css('margin-top', '5%');
  $('sign-in-form').css('height', '30%');
  $('#admin-sign-in').on('click', signInAdmin);
}

function createAgent() {
  let agent = new TravelAgent(allData.trips);
  agent.calculateIncomeForEachTrip();
}

function signInAdmin() {
  if ($('#user').val() === 'agency' && $('#password').val() === 'travel2020') {
    let agent = new TravelAgent(allData.trips);
    createAgentDashboard(agent);
    createHeaderForAgentDashboard(agent);
  } else {
    alert('Your username or passowrd is not correct.');
  }
}

function createAgentDashboard(admin) {
  $('main').html(`<section>
    <h3>New Trip Requests</h3>
    <h3>Total Income Generated This Year:</h3>
    <h3>Travelers on Trips Today:</h3>
    </section>`)
}

function createHeaderForAgentDashboard(admin) {
  $('header section').html(`<img src="./images/user.svg" alt="profile icon">
    <p>Admin</p>`);
}
