export default class DummySwapiService {

  _people = [
    {
      id: 1,
      name: 'Bilbo Baggins [TEST DATA]',
      gender: 'male',
      birthYear: 'long ago',
      eyeColor: 'dark brown'
    },

    {
      id: 2,
      name: 'Frodo Baggins [TEST DATA]',
      gender: 'male',
      birthYear: 'not so long ago',
      eyeColor: 'dark green'
    }
  ];

  _planets = [
    {
      id: 1,
      name: 'Earth [TEST DATA]',
      population: '7.530.000.000',
      period: '23 hours 56 seconds',
      diameter: '12.742 km'
    },
    {
      id: 2,
      name: 'Venus [TEST DATA]',
      population: 'not known',
      period: '243 days',
      diameter: '12.104 km'
    }
  ];

  _starships = [
    {
      id: 1,
      name: 'USS Enterprise [TEST DATA]',
      model: 'NCC-1701-C',
      manufacturer: 'Northrop Grumman Shipbuilding',
      costInCredits: 'not known',
      length: 'approx 300 meters',
      crew: 1000,
      passengers: 50,
      cargoCapacity: 100
    },
    {
      id: 2,
      name: 'USS Enterprise 2 [TEST DATA]',
      model: 'NCC-1702-C',
      manufacturer: 'Northrop Grumman Shipbuilding',
      costInCredits: 'not known',
      length: 'approx 400 meters',
      crew: 2000,
      passengers: 150,
      cargoCapacity: 200
    }
  ];

  getAllPeople = async () => {
    return this._people;
  };

  getPerson = async id => {
    return this._people.find(item => item.id.toString() === id.toString());
  };

  getAllPlanets = async () => {
    return this._planets;
  };

  getPlanet = async id => {
    return this._planets.find(item => item.id.toString() === id.toString())
  };

  getAllStarships = async () => {
    return this._starships;
  };

  getStarship = async id => {
    return this._starships.find(item => item.id.toString() === id.toString());
  };

  getMaxPeopleId = async () => {
    return Math.max(...this._people.map(item => Number.parseInt(item.id)));
  }

  getPersonImage = ({id}) => `https://placeimg.com/400/500/people/${id}`;
  getStarshipImage = ({id}) => `https://placeimg.com/600/400/tech/${id}`;
  getPlanetImage = ({id}) => `https://placeimg.com/400/400/nature/${id}`;
}
