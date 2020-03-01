import moment from 'moment';
import Trip from '../src/Trip.js'

const destinationsData = [{
  "id": 28,
  "destination": "San Juan, Puerto Rico",
  "estimatedLodgingCostPerDay": 70,
  "estimatedFlightCostPerPerson": 900,
  "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
  "alt": "white and brown concrete buildings near sea under white clouds during daytime"
},
{
  "id": 35,
  "destination": "Anchorage, Alaska",
  "estimatedLodgingCostPerDay": 200,
  "estimatedFlightCostPerPerson": 100,
  "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "alt": "man riding on kayak surrounded by mountains"
},
{
  "id": 48,
  "destination": "Dar es Salaam, Tanzania",
  "estimatedLodgingCostPerDay": 1200,
  "estimatedFlightCostPerPerson": 100,
  "image": "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
  "alt": "aerial photography of high-rise building"
},
{
  "id": 50,
  "destination": "Hobart, Tasmania",
  "estimatedLodgingCostPerDay": 1400,
  "estimatedFlightCostPerPerson": 75,
  "image": "https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "alt": "person sitting on brown rock in front of body of water"
},
{
  "id": 23,
  "destination": "Copenhagen, Denmark",
  "estimatedLodgingCostPerDay": 120,
  "estimatedFlightCostPerPerson": 1000,
  "image": "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "alt": "colorful buildings with holiday decorations by the water with tents and docked boats"
},
{
  "id": 25,
  "destination": "New York, New York",
  "estimatedLodgingCostPerDay": 175,
  "estimatedFlightCostPerPerson": 200,
  "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
}];

class Traveler {
  constructor(travelerData, tripsData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.tripsData = tripsData;
    this.pastTrips = [];
    this.pendingTrips = [];
    this.upcomingTrips = [];
  }

  getAllTripsForUser() {
    return this.tripsData.filter(trip => {
      return trip.userID === this.id;
    });
  }

  determineTripDateDifference() {
    const allTrips = this.getAllTripsForUser();
    let today = moment();
    let tripDate;
    let dateDifference;
    return allTrips.map(trip => {
      tripDate = moment(trip.date)
      return {
        "tripID": trip.id,
        "dateDifference": today.diff(tripDate, 'days')
      }
    });
  }

  getPastTrips() {
    let dateDifferences = this.determineTripDateDifference();
    let allTripsForUser = this.getAllTripsForUser();
    let pastTrip;

    return dateDifferences.reduce((pastTrips, trip) => {
      if(trip.dateDifference > 0) {
        pastTrip = allTripsForUser.find(singleTrip => {
          return singleTrip.id === trip.tripID
        })
        this.pastTrips.push(pastTrip)
      }
      return this.pastTrips;
    }, this.pastTrips);
  }

  getPendingTrips() {
    let allTripsForUser = this.getAllTripsForUser();
    return allTripsForUser.reduce((pendingTrips, trip) => {
      if(trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
      return this.pendingTrips;
    }, this.pendingTrips);
  }

  getAllUpcomingTrips() {
    let dateDifferences = this.determineTripDateDifference();
    let allTripsForUser = this.getAllTripsForUser();
    let pendingTrips = this.getPendingTrips();
    let upcomingTrip;
    return dateDifferences.reduce((upcomingTrips, trip) => {
      if(trip.dateDifference < 0) {
        upcomingTrip = allTripsForUser.find(singleTrip => {
          return singleTrip.id === trip.tripID;
        })
        this.upcomingTrips.push(upcomingTrip)
      }
      return this.upcomingTrips;
    }, this.upcomingTrips);
  }

  getApprovedUpcomingTrips() {
    let allUpcomingTrips = this.getAllUpcomingTrips();
    return this.upcomingTrips = allUpcomingTrips.filter(upcomingTrip => {
      return upcomingTrip.status === 'approved'
    });
  }

  getTotalCostOfTrip() {
    this.getPastTrips();
    this.getAllUpcomingTrips();
    let allApprovedTrips = this.pastTrips.concat(this.upcomingTrips);
    let updatedApprovedTrips = this.removeDuplicates(allApprovedTrips);
    console.log(updatedApprovedTrips.length);
    let tripCost;

    return updatedApprovedTrips.reduce((totalCostOfAllTrips, trip) => {
      trip = new Trip(trip, destinationsData)
      tripCost = trip.calculateCostOfTrip() * 1.1;
      totalCostOfAllTrips += tripCost;
      console.log(totalCostOfAllTrips);
      return Math.round(totalCostOfAllTrips);
    }, 0);
  }

  removeDuplicates(list) {
    let uniqueTrips = [];
    list.forEach(listItem => {
      if (!uniqueTrips.includes(listItem)) {
        uniqueTrips.push(listItem)
        }
      })
      return uniqueTrips;
    }
}

export default Traveler;
