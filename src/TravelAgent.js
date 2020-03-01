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

class TravelAgent {
  constructor(allTripsData) {
    this.allTripsData = allTripsData;
  }

  listNewTripRequests() {
    return this.allTripsData.filter(trip => {
      return trip.status === 'pending';
    });
  }

  filterTripsByCurrentYear() {
    let currentYear = new Date().getFullYear();
    return this.allTripsData.filter(trip => {
      let tripYear = parseInt(trip.date.slice(0, 4));
      return tripYear === currentYear;
    });
  }

  calculateIncomeForEachTrip() {
    let tripsThisYear = this.filterTripsByCurrentYear();
    return tripsThisYear.map(trip => {
      trip = new Trip(trip, destinationsData);
      return trip.calculateCostOfTrip() * .1
    })
  }

  calculateIncomeForYear() {
    let allTrips = this.calculateIncomeForEachTrip();
    return allTrips.reduce((totalIncome, tripCommission) => {
      totalIncome += tripCommission;
      return Math.round(totalIncome);
    }, 0)
  }


}

export default TravelAgent;
