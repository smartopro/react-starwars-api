import React from "react";
import "./RandomPlanet.scss";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";
import {
    SwapiServiceContext
} from "../SwapiServiceContext";

export default class RandomPlanet extends React.Component {
    static contextType = SwapiServiceContext;
    // swapiService = new SwapiService();

    state = {
        planet: {
            loading: true
        }
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(this.update, 50000000);
    }

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval);
    }

    onPlanetLoaded = planet => {
        this.setState({
            planet: {
                ...planet,
                loading: false,
                error: false
            }
        });
    }

    onError = error => {
        this.setState({
            planet: {
                error: error,
            }
        });
    }

    update = () =>  {
        this.setState({ planet: { loading: true } });
        // const id = Math.floor(Math.random()*18) + 2;
        const id = Math.floor(Math.random()*2)+1;
        this.context
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        const planet = this.state.planet;

        return (
            <div className="random-planet jumbotron rounded">
                {
                    planet.error ? <ErrorIndicator message={ planet.error } /> :
                        planet.loading ? <Spinner /> : <PlanetView planet={planet} />
                }
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const { id, name, population, period, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt={`id: ${id}`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{period}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
