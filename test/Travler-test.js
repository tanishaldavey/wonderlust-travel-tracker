import { expect } from 'chai';
import spies from 'chai-spies';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js'

let tripsData, travelerData, traveler1, traveler2, traveler3;

beforeEach(() => {
  tripsData = [{
    "id": 117,
    "userID": 1,
    "destinationID": 28,
    "travelers": 3,
    "date": "2021/01/09",
    "duration": 15,
    "status": "approved"
    },
    {
    "id": 6,
    "userID": 29,
    "destinationID": 35,
    "travelers": 3,
    "date": "2020/06/29",
    "duration": 9,
    "status": "approved"
    },
    {
    "id": 40,
    "userID": 29,
    "destinationID": 50,
    "travelers": 3,
    "date": "2020/10/31",
    "duration": 13,
    "status": "approved"
    },
    {
    "id": 192,
    "userID": 29,
    "destinationID": 48,
    "travelers": 5,
    "date": "2019/09/24",
    "duration": 17,
    "status": "approved"
    },
    {
    "id": 200,
    "userID": 29,
    "destinationID": 23,
    "travelers": 6,
    "date": "2020/06/29",
    "duration": 7,
    "status": "approved"
    },
    {
    "id": 2,
    "userID": 35,
    "destinationID": 25,
    "travelers": 5,
    "date": "2020/10/04",
    "duration": 18,
    "status": "pending",
    "suggestedActivities": []
    }];
      travelerData = [{
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    },
    {
    "id": 29,
    "name": "Oliviero Tunuy",
    "travelerType": "shopper"
    },
    {
    "id": 35,
    "name": "Lorilyn Frostdick",
    "travelerType": "shopper"
    }];
  traveler1 = new Traveler(travelerData[0]);
  traveler2 = new Traveler(travelerData[1]);
  traveler3 = new Traveler(travelerData[2]);
});

describe('Traveler', () => {
  it('should be an instance of the class Traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
  });

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
  });

  it('should have a travlerType', () => {
    expect(traveler1.travelerType).to.equal("relaxer");
  });

  it('should be able to list trips taken in the past', () => {

  });

  it('should be able to list trips that are pending', () => {

  });
  
  it('should be able to list (approved) trips that are upcoming', () => {

  });
});
