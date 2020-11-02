import React from "react";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";

import "./App.scss";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import DummySwapiService from "../../services/dummy-swapi-service"
import ErrorBoundry from "../ErrorBoundry";
import {
    PersonDetails,
    PersonList,
    PlanetDetails,
    PlanetList,
    StarshipDetails,
    StarshipList
} from "../SWComponents";
import { SwapiServiceProvider } from "../SwapiServiceContext";

export default class App extends React.Component {
    state = {
        hasError: false
    }

    swapiService = new DummySwapiService();

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={ this.swapiService }>
                    <div>
                        <Header />
                        {/*<RandomPlanet />*/}
                        {/*<ErrorButton />*/}
                        {/*<Row left={personDetails}*/}
                        {/*     right={starshipDetails} />*/}

                        <PersonDetails itemId={11} />
                        <PlanetDetails itemId={2} />
                        <StarshipDetails itemId={9} />

                        <PersonList />
                        <StarshipList />
                        <PlanetList />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
}
