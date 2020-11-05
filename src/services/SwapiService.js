const getJSON = async url => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Couldn't fetch ${url}, received status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

export default class SwapiService {
    #url = "https://swapi.dev/api";
    #imageUrl = "https://starwars-visualguide.com/assets/img";

    getAllPeople = async () => {
        const result = await getJSON(`${this.#url}/people/`);
        return result.results.map(this._transformPerson);
    }

    getPerson = async id => {
        const person = await getJSON(`${this.#url}/people/${id}/`);
        return this._transformPerson(person);
    }

    getAllPlanets = async () => {
        const result = await getJSON(`${this.#url}/planets/`);
        return result.results.map(this._transformPlanet);
    }

    getPlanet = async id => {
        const planet = await getJSON(`${this.#url}/planets/${id}/`);
        return this._transformPlanet(planet);
    }

    getAllStarships = async () => {
        const result = await getJSON(`${this.#url}/starships/`);
        return result.results.map(this._transformStarship);
    }

    getStarship = async id => {
        const starship = await getJSON(`${this.#url}/starships/${id}/`);
        return this._transformStarship(starship);
    }

    _extractId = item => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = planet => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            period: planet["rotation_period"],
            diameter: planet.diameter
        };
    }

    _transformStarship = starship => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship["cost_in_credits"],
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = person => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person["birth_year"],
            eyeColor: person["eye_color"]
        }
    }

    getMaxPeopleId = async () => {
        const people = await this.getAllPeople();
        return Math.max(...people.map(item => item.id));
    }

    getPersonImage = ({id}) => `${this.#imageUrl}/characters/${id}.jpg`;
    getStarshipImage = ({id}) => `${this.#imageUrl}/starships/${id}.jpg`;
    getPlanetImage = ({id}) => `${this.#imageUrl}/planets/${id}.jpg`;
}
