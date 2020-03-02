import $ from 'jquery';
import signInAdmin from './index.js'

let domUpdates = {
  //TRAVELER FUNCTIONALITY
  createTravelerDashboard(traveler) {
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
  //ADMIN FUNCTIONALITY
  displayAdminLogInScreen(event) {
    event.preventDefault();
    $('h1').text('Wonderland Admin Login Page')
    $('#user').attr('placeholder', 'admin username')
    $('main h3').remove();
    $('#sign-in-form h2').remove();
    $('#sign-in-form p').remove();
    // $('#sign-in-form button').remove();
    // $('#sign-in-form').append(`<button id="admin-sign-in" type='button'>Sign In</button>`)
    $('main').css('background', '#7b8a56')
    $('h1').css('font-size', '4em');
    $('#sign-in-form').css('background', '#cad0bb');
    $('#sign-in-form').css('margin-top', '5%');
    $('sign-in-form').css('height', '30%');
    // $('#admin-sign-in').on('click', signInAdmin);
  },

  createAdminSignInButton() {
    $('#sign-in-form button').remove();
    $('#sign-in-form').append(`<button id="admin-sign-in" type='button'>Sign In</button>`)
    $('#admin-sign-in').on('click', signInAdmin);
  },

  createAgentDashboard(admin) {
    $('main').html(`<section>
      <h3>New Trip Requests</h3>
      <h3>Total Income Generated This Year:</h3>
      <h3>Travelers on Trips Today:</h3>
      </section>`)
  },

  createHeaderForAgentDashboard(admin) {
    $('header section').html(`<img src="./images/user.svg" alt="profile icon">
      <p>Admin</p>`);
  }
}

export default domUpdates;
