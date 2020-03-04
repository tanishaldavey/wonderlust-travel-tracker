class TravelAgent {
  constructor(allTripsData) {
    this.allTripsData = allTripsData;
  }

  getCurrentDate() {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDate = new Date().getDate();
    if (currentMonth.toString().length === 1) {
      currentMonth = `0${currentMonth}`
    }
    if (currentDate.toString().length === 1) {
      currentDate = `0${currentDate}`
    }
    return (`${currentYear}/${currentMonth}/${currentDate}`);
  }

  getDailyNumberOfTravelers() {
    let todaysDate = this.getCurrentDate();
    console.log(todaysDate);
    return this.allTripsData.reduce((travelersOnTripsToday, trip) => {
      if (todaysDate === trip.date) {
        travelersOnTripsToday += trip.travelers;
      }
      return travelersOnTripsToday;
    }, 0)
  }
}

export default TravelAgent;
