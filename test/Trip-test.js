import { expect } from 'chai';
import spies from 'chai-spies';
import Trip from '../src/trip.js';

let tripData, trip1, trip2;

beforeEach(() => {
  tripData = [{
    "id": 3,
    "userID": 3,
    "destinationID": 22,
    "travelers": 4,
    "date": "2020/05/22",
    "duration": 17,
    "status": "pending"
  },
    {
    "id": 4,
    "userID": 43,
    "destinationID": 14,
    "travelers": 2,
    "date": "2020/02/25",
    "duration": 10,
    "status": "approved"
    }];
  trip1 = new Trip(tripData[0]);
  trip2 = new Trip(tripData[1]);
});

describe('Trip', () => {
  it('should be an instance of a Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
  });

  it('should have a id', () => {
    expect(trip1.id).to.equal(3);
    expect(trip2.id).to.equal(4);
  });

  it('should have a userID', () => {
    expect(trip1.userID).to.equal(3);
    expect(trip2.userID).to.equal(43);
  });

  it('should have a destination ID', () => {
    expect(trip1.destinationID).to.equal(22);
    expect(trip2.destinationID).to.equal(14);
  });

  it('should a number of travelers', () => {
    expect(trip1.travelers).to.equal(4);
    expect(trip2.travelers).to.equal(2);
  });

  it('should hav date that\'s set to a string', () => {
    expect(trip1.date).to.equal("2020/05/22");
    expect(trip2.date).to.equal("2020/02/25")
  });

  it('should have a duration amount for length of the trip', () => {
    expect(trip1.duration).to.equal(17);
    expect(trip2.duration).to.equal(10);
  });

  describe('should have a status', () => {
    it('should be able to have a status of pending', () => {
      expect(trip1.status).to.equal("pending");
    });

    it('should be able to have a status of approved', () => {
      expect(trip2.status).to.equal("approved");
    });
  });

  it('should be able to calculate the cost of a trip', () => {
    expect(trip1.calculateCostOfTrip()).to.equal()
    expect(trip2.calculateCostOfTrip()).to.equal()
  })
});
