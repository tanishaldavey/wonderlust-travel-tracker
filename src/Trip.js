class Trip {
  constructor(tripData, destinationData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.destinationData = destinationData;
    this.tripDestinationName = null;
  }

  findTripDestination() {
    return this.destinationData.find(destination => {
      return destination.id === this.destinationID;
    });
  }

  calculateCostOfTrip() {
    let destination = this.findTripDestination();
    let lodgingForEachPerson = destination.estimatedLodgingCostPerDay * this.travelers * this.duration;
    let costOFFlightPerson = destination.estimatedFlightCostPerPerson * this.travelers;
    return lodgingForEachPerson + costOFFlightPerson;
  }

  getDestinationName() {
    return this.tripDestinationName = this.findTripDestination().destination;
  }
}

export default Trip;
