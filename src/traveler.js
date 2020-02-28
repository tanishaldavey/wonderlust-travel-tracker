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
}

export default Traveler;
