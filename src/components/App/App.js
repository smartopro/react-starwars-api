import React from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";

import "./App.scss";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import DummySwapiService from "../../services/dummy-swapi-service"
import ErrorBoundry from "../ErrorBoundry";
import { SwapiServiceProvider } from "../SwapiServiceContext";
import { PeoplePage, PlanetPage, StarshipPage } from "../Pages";

export default class App extends React.Component {
    state = {
        hasError: false,
        swapiService: new DummySwapiService()
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({ hasError: true });
    }

    onServiceChange = () => {
        this.setState(({swapiService}) => ({
                swapiService: (swapiService instanceof SwapiService) ? new DummySwapiService() : new SwapiService()
            })
        );
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={ this.state.swapiService }>
                    <div>
                        <Header onServiceChange={this.onServiceChange} />

                        <RandomPlanet />

                        <PeoplePage />

                        <PlanetPage />

                        <StarshipPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
}
