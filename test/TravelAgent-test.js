import { expect } from 'chai';
import spies from 'chai-spies';
import TravelAgent from '../src/TravelAgent.js';

let tripsData, travelAgent;

beforeEach(()=> {
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
    "status": "pending"
  }];
  travelAgent = new TravelAgent(tripsData)
});

describe('TravelAgent', () => {
  it('should be an instance of a TravelAgent', () => {
    expect(travelAgent).to.be.instanceOf(TravelAgent);
  });

  it('should be able to see new trip requests (pending trip requests)', () => {
    expect(travelAgent.listNewTripRequests()).to.deep.equal([tripsData[5]]);
  });

  it('should be able to calculate total income generated this year (10% of user trip costs)', () => {
    expect(travelAgent.calculateIncomeForYear()).to.equal(8832);
  });

  it('should be able to see the number of travelers on trips for today\'s date', () => {
    //checking against today's date 3/1/2020
    expect(travelAgent.getDailyNumberOfTravelers()).to.equal(0);
  })
});
