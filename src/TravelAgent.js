class TravelAgent {
  constructor(allTripsData) {
    this.allTripsData = allTripsData;
  }

  listNewTripRequests() {
    return this.allTripsData.filter(trip => {
      return trip.status === 'pending';
    })
  }
}

export default TravelAgent;
