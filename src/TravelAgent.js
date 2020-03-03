class TravelAgent {
  constructor(allTripsData) {
    this.allTripsData = allTripsData;
  }

  getCurrentDate() {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDate = new Date().getDate();
    return (`${currentYear}/${currentMonth}/${currentDate}`);
  }

  getDailyNumberOfTravelers() {
    let todaysDate = this.getCurrentDate();
    return this.allTripsData.reduce((travelersOnTripsToday, trip) => {
      if (todaysDate === trip.date) {
        travelersOnTripsToday += trip.travelers;
      }
      return travelersOnTripsToday;
    }, 0)
  }
}

export default TravelAgent;
