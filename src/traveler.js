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
}

export default Traveler;
