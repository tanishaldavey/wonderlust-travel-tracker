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
      displayIncomeGenerated();
    } else {
      alert('Your username or passowrd is not correct.');
    }
  }

let createTripApprovalData = () => {
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

// function removeTripAfterPermissionUpdate(tripId) {
//   $(`div[id=${tripId}]`).remove();
// }

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

function getTripsForThisYear() {
  let currentYear = new Date().getFullYear();
  return allTrips().filter(trip => {
    let tripYear = parseInt(trip.date.slice(0, 4));
    return tripYear === currentYear;
  });
}
//function needs to do trips that are this year 2020!!
function calculateIncomeGeneratedThisYear() {
  let tripsThisYear = getTripsForThisYear()
    return tripsThisYear.reduce((totalIncome, trip) => {
      trip = new Trip(trip, allData.destinations)
      totalIncome += (trip.calculateCostOfTrip() * .1);
      return totalIncome;
    }, 0);
  }

function displayIncomeGenerated() {
  $('.total-income').append(`<p>$${calculateIncomeGeneratedThisYear()}</p>`).css('text-align', 'center');
}

function updateTotalCost() {
  let duration = $('#duration').val();
  let travelers = $('#travelers').val();

  $('.display-trip-cost').html(`<p>Total Cost of Lodging For This Trip: $${travelers * duration * 500}.00</p>
    <p>Total Cost of Flights For This Trip: $${travelers * 500}.00</p>
    <p>Travel Agent's 10% Fee: $${((duration * travelers * 500) + (travelers * 500)) * .1}.00</p>
    <p>Total Cost of this Trip:<p>`)
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

export { signInAdmin, allDestinations, allData, approveTrip, denyTrip, updateTotalCost, submitNewTripRequest }
