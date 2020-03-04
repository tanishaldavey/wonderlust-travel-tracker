import $ from 'jquery';
//STYLESHEETS
import './css/base.scss';
import './css/styles.scss';
//CLASSES
import Destination from './Destination.js'
import Trip from './Trip.js'
import Traveler from './Traveler.js'
import TravelAgent from './TravelAgent.js'
//IMAGES USED IN THE INDEX
import './images/w-icon.png'
import './images/user.svg'
//DOMUPDATES
import domUpdates from './domUpdates.js'

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

let allData, destination, trip, traveler;

$('#sign-in-submit').on('click', signInTraveler);
$('#admin-log-in').on('click', domUpdates.displayAdminLogInScreen);
$('#admin-log-in').on('click', domUpdates.createAdminSignInButton);

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
    return  destination = new Destination(destinationData)
  });
};

let allTrips = () => {
  return allData.trips.map(tripData => {
    return trip = new Trip(tripData, allData.destinations)
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

function signInTraveler() {
  let userInput = $('#user').val();
  let passwordInput = $('#password').val();
  let userId = userInput.slice(8);
  let travelers = updateTravelerProperties();
  let currentTraveler;
  if ((typeof parseInt(userInput[8])) === 'number' && passwordInput === 'travel2020') {
    currentTraveler = travelers[userId - 1];
    domUpdates.createHeaderForTravelerDashboard(currentTraveler)
    domUpdates.createTravelerDashboard(currentTraveler)
    domUpdates.insertPastTrips(currentTraveler);
    domUpdates.insertUpcomingTrips(currentTraveler);
    domUpdates.insertPendingTrips(currentTraveler);
  } else {
    alert('Your username or passowrd is not correct.')
  }
}

function signInAdmin() {
    if ($('#user').val() === 'agency' && $('#password').val() === 'travel2020') {
      let agent = new TravelAgent(allData.trips);
      domUpdates.createAgentDashboard(agent);
      domUpdates.createHeaderForAgentDashboard(agent);
      domUpdates.displayAllPendingTripRequests();
      domUpdates.displayIncomeGenerated();
      domUpdates.displayTravelersOnTripsToday(agent);
    } else {
      alert('Your username or passowrd is not correct.');
    }
  }

let createTripApprovalData = () => {
  console.log(event);
  let tripId = event.target.parentElement.id;
  let tripData = {
    "id": parseInt(tripId),
    "status": "approved"
  }
  return tripData;
}

let approveTrip = () => {
  let tripInfo = createTripApprovalData();
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripInfo)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .then(domUpdates.removeTripAfterPermissionUpdate(tripInfo.id))
  .catch(error => console.log(error))
}

let createTripDenialData = () => {
  let tripId = event.target.parentElement.id;
  let tripData = {
    "id": parseInt(tripId),
  }
  return tripData;
}

let denyTrip = () => {
  let tripInfo = createTripDenialData();
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripInfo)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .then(domUpdates.removeTripAfterPermissionUpdate(tripInfo.id))
  .catch(error => console.log(error))
}

let tripsForThisYear = (trips) => {
  let currentYear = new Date().getFullYear();
  return trips.filter(trip => {
    let tripYear = parseInt(trip.date.slice(0, 4));
    return tripYear === currentYear;
  });
}

let incomeGeneratedThisYear = () => {
  let tripsThisYear = tripsForThisYear(allTrips())
    return tripsThisYear.reduce((totalIncome, trip) => {
      trip = new Trip(trip, allData.destinations)
      totalIncome += (trip.calculateCostOfTrip() * .1);
      return totalIncome;
    }, 0);
  }

let moneySpentOnTripsThisYear = (traveler) => {
  let confirmedTrips = traveler.pastTrips.concat(traveler.upcomingTrips)
  let tripsThisYear = tripsForThisYear(confirmedTrips);
  return tripsThisYear.reduce((totalSpent, trip) => {
    return totalSpent += (trip.calculateCostOfTrip() * 1.1);
  }, 0)
}

function createTripBookingData() {
  let destinationID = event.target.parentElement.parentElement.parentElement.id;
  let userID = event.target.parentElement.parentElement.parentElement.parentElement.id;
  let tripData = {
     "id": Date.now(),
     "userID": parseInt(userID),
     "destinationID": parseInt(destinationID),
     "travelers": parseInt($('#travelers').val()),
     "date": $('#date').val().split('-').join('/'),
     "duration": parseInt($('#duration').val()),
     "status": "pending",
     "suggestedActivities": []
   };
  return tripData;
}

let submitNewTripRequest = () => {
  let tripInfo = createTripBookingData()
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripInfo)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .then(domUpdates.displayNavigationOptions)
  .catch(error => console.log(error))
}

function searchServerForTraveler() {
  if ($('#search-input').val()) {
    let id = parseInt($('#search-input').val());
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(getSearchedTravelerResults(id))
      .catch(error => console.log(error))
  }
}

function getSearchedTravelerResults(userID) {
  let travelers = updateTravelerProperties();
  let searchedTraveler = travelers[userID - 1];
  $('#search-input').val('')
  $('main').css('height', 'auto')
  $('main').css('min-heigh', '90vh')
  $('.dashboard-info').html(`<h3>Traveler Name: ${searchedTraveler.name}</h3>
    <h4>New Trip Requests</h4>
    <section id="search-traveler-pending-trips"></section>
    <h4>Upcoming Trips</h4>
    <section id="search-traveler-upcoming-trips"></section>
    <h4>Past Trips</h4>
    <section id="search-traveler-past-trips"></section>`)
    displaySingleTravelerTripsOnAdminDashboard(searchedTraveler, searchedTraveler.pastTrips, `#search-traveler-past-trips`);
    displaySingleTravelerTripsOnAdminDashboard(searchedTraveler, searchedTraveler.upcomingTrips, `#search-traveler-upcoming-trips`);
    displayTripPermissionButtons(searchedTraveler)
  }

function displaySingleTravelerTripsOnAdminDashboard(traveler, tripTime, section) {
    tripTime.forEach(trip => {
      $(section).append(`<p>${trip.tripDestinationName}</p>
        <p>${trip.date}<p>
        <p>Total Spent: $${Math.round(trip.calculateCostOfTrip() * 1.1)}</p>`)
    })
  }

function displayTripPermissionButtons(traveler) {
    if (traveler.pendingTrips) {
      traveler.pendingTrips.forEach(trip => {
        $('#search-traveler-pending-trips').html(`<div id=${trip.id}>
          <p>${trip.tripDestinationName}</p>
          <p>${trip.date}</p>
          <p>Total Spent: $${Math.round(trip.calculateCostOfTrip() * 1.1)}</p>
          <button class="approve-trip-2" type="button">Approve</button>
          <button class="delete-trip-2" type="button">Deny</button>
        </div>`)
        $('.approve-trip-2').on('click', approveTrip);
        $('.delete-trip-2').on('click', denyTrip);
      })
    }
  }

export { signInAdmin, allDestinations, allData, approveTrip, denyTrip, submitNewTripRequest, incomeGeneratedThisYear, moneySpentOnTripsThisYear, searchServerForTraveler }
