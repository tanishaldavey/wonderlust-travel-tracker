import moment from 'moment';

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

  
}

export default Traveler;
