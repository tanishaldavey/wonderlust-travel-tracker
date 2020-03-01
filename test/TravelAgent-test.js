import { expect } from 'chai';
import spies from 'chai-spies';
import TravelAgent from '../src/TravelAgent.js';

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
});

describe('TravelAgent', () => {

});
