import { expect } from 'chai';
import spies from 'chai-spies';
import Traveler from '../src/traveler.js';

let travelerData, traveler;

beforeEach(() => {
  travelerData = [{
  "id": 1,
  "name": "Ham Leadbeater",
  "travelerType": "relaxer"
  }];
  traveler = new Traveler(travelerData[0]);
});

describe('Traveler', () => {
  it('should be an instance of the class Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should have an id', () => {
    expect(traveler.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(traveler.name).to.equal("Ham Leadbeater");
  });

  it('should have a travlerType', () => {
    expect(traveler.travelerType).to.equal("relaxer");
  });
});
