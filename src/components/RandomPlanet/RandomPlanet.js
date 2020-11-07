import React from "react";
import PropTypes from "prop-types";

import "./RandomPlanet.scss";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";
import {
    SwapiServiceContext
} from "../SwapiServiceContext";
import {withSwapiService} from "../HOCHelphers";

class RandomPlanet extends React.Component {
    static defaultProps = {
        updateInterval: 600 * 1000
    }

    static propTypes = {
        updateInterval: PropTypes.number.isRequired
    }

    static contextType = SwapiServiceContext;

    state = {
        planet: {
            loading: true
        }
    }

    componentDidMount() {
        const {updateInterval} = this.props;
        this.update();
        this.interval = setInterval(this.update, updateInterval);
    }

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        if (this.props.getPlanet !== prevProps.getPlanet) this.update();
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
        let id, image;
        this.props
            .getMaxPeopleId()
            .then(maxPeopleId => {
                id = Math.floor(Math.random()*maxPeopleId)+1;
                image = this.props.getPlanetImage({id});
            })
            .then(() => this.props.getPlanet(id))
            .then(planet => ({ ...planet, image }))
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

export default withSwapiService(swapiService => {
    return {
        getMaxPeopleId: swapiService.getMaxPeopleId,
        getPlanet: swapiService.getPlanet,
        getPlanetImage: swapiService.getPlanetImage
    }
})(RandomPlanet)

const PlanetView = ({planet}) => {
    const { id, name, population, period, diameter, image } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={image} alt={`id: ${id}`} />
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
