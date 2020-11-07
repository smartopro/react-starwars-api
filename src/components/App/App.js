import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";

import "./App.scss";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import DummySwapiService from "../../services/dummy-swapi-service"
import ErrorBoundry from "../ErrorBoundry";
import { SwapiServiceProvider } from "../SwapiServiceContext";
import { PeoplePage, PlanetPage, StarshipPage, LoginPage, SecretPage } from "../Pages";
import {StarshipDetails} from "../SWComponents";

export default class App extends React.Component {
    state = {
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    }

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
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
                    <Router>
                        <div className="App">
                            <Header onServiceChange={this.onServiceChange} />
                            <RandomPlanet />

                            <Switch>
                                <Route
                                    path="/"
                                    render={() => <h2>Welcome to StarDB</h2>}
                                    exact />
                                <Route path="/people/:id?" component={PeoplePage} />
                                <Route path="/planets" component={PlanetPage} />
                                <Route path="/starships" exact component={StarshipPage} />
                                <Route path="/starships/:id"
                                       render={({ match, location, history }) => {
                                           return <StarshipDetails itemId={match.params.id} />
                                       }}/>
                                <Route path="/login" render={ () => <LoginPage isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin} /> } />
                                <Route path="/secret" render={ () => <SecretPage isLoggedIn={this.state.isLoggedIn} /> } />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
}
