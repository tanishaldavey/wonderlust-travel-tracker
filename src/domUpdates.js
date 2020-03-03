import $ from 'jquery';
import { signInAdmin, allDestinations } from './index.js';

let domUpdates = {
  //TRAVELER FUNCTIONALITY
  createTravelerDashboard(traveler) {
    $('main').html(`<section class="traveler-dashboard">
        <p>$total spent this year on trips</p>
        <button id="booking-page-btn" type="button">Book New Trip<button>
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
      $('main').attr('id', `${traveler.id}`)
      $('main').css('height', '100vh');
      $('#booking-page-btn').on('click', domUpdates.displayBookingPage);
  },
  createHeaderForTravelerDashboard(traveler) {
    $('header section').css('width', '30%')
    $('header section').css('justify-content', 'flex-end')
    $('header section').html(`<img src="./images/user.svg" alt="profile icon">
      <p>${traveler.name}</p>`)
    $('header section p').css('margin-left', '-5%')
  },
  insertPastTrips(traveler) {
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
  },
  insertUpcomingTrips(traveler) {
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
  },
  insertPendingTrips(traveler) {
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
  },
  displayBookingPage() {
    event.preventDefault();
    $('main').html(`<section class="all-destination-cards"></section>`)
    domUpdates.createDestinationCard();
  },
  createDestinationCard() {
    allDestinations().forEach(destination => {
      $('.all-destination-cards').append(`<div id=${destination.id} class="destination">
        <p>${destination.name}</p>
        <img class="destination-img" src="${destination.image}" alt=${destination.alt}>
        <p>Lodging Per Day: $${destination.estimatedLodgingCostPerDay}.00</p>
        <p>Flight Per Person: $${destination.estimatedFlightCostPerPerson}.00</p>
        <button class='trip-booking-btn'>Book This Trip<button>`)
    });
    $('main').css('height', 'auto');
    $('.trip-booking-btn').on('click', domUpdates.displayBookingForm);
  },
  displayBookingForm() {
    let destinationID = event.target.parentElement.id;
    let destination = allDestinations()[destinationID - 1];
    $('main').html(`<section id=${destination.id}>
        <form id="booking-trip-form">
        <p>Book a trip to <span>${destination.name}</span><p>
        <label for="date">Date
          <input id="date" type="date">
        </label>
        <label for="duration"> Duration
          <input id="duration" type="number">
        </label>
        <label for="travelers">Number of Travelers
          <input id="travelers" type="number">
        </label>
        <button id="submit-trip-btn" type="button">Submit Trip</button>
        <button id="cancel-booking" type="button">Cancel</button>
        </form>
        </section>`)
      $('main').css('height', '90vh');
      $('main').append(`<section class="display-trip-cost"></section>`)
      $('#cancel-booking').on('click', domUpdates.displayBookingPage);
      $('input[id="duration"], input[id="travelers"], input[id="date"]').on('input', updateTotalCost);
      $('#submit-trip-btn').on('click', submitNewTripRequest)
  },



  //ADMIN FUNCTIONALITY
  displayAdminLogInScreen(event) {
    event.preventDefault();
    $('#user').val('');
    $('#password').val('')
    $('h1').text('Wonderlust Admin Login Page')
    $('#user').attr('placeholder', 'admin username')
    $('main h3').remove();
    $('#sign-in-form h2').remove();
    $('#sign-in-form p').remove();
    $('main').css('background', '#7b8a56')
    $('h1').css('font-size', '4em');
    $('#sign-in-form').css('background', '#cad0bb');
    $('#sign-in-form').css('margin-top', '5%');
    $('sign-in-form').css('height', '30%');
  },

  createAdminSignInButton() {
    $('#sign-in-form button').remove();
    $('#sign-in-form').append(`<button id="admin-sign-in" type='button'>Sign In</button>`)
    $('#admin-sign-in').on('click', signInAdmin);
  },

  createAgentDashboard(admin) {
    $('main').html(`<section>
      <h3>New Trip Requests</h3>
      <section class="trips-to-approve"></section>
      <h3>Total Income Generated This Year</h3>
      <section class="total-income"></section>
      <h3>Travelers on Trips Today:</h3>
      <section></section>
      </section>`)
      $('main').css('height', 'auto');
  },

  createHeaderForAgentDashboard(admin) {
    $('header section').html(`<img src="./images/user.svg" alt="profile icon">
      <p>Admin</p>`);
  }
}

export default domUpdates;
