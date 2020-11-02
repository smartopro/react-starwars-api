import React from "react";
import "./PeoplePage.scss";

import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import SwapiService from "../../services/SwapiService";
import Row from "../Row";
import ErrorBoundry from "../ErrorBoundry";

export default class PeoplePage extends React.Component {
    state = {
        selectedPersonId: null,
    }

    swapiService = new SwapiService();

    onPersonSelected = id => {
        this.setState({
            selectedPersonId: id
        });
    }

    render() {
        const itemList = (
            <ItemList onItemSelected={ this.onPersonSelected }
                      getData={ this.swapiService.getAllPeople }>
                { i => <span>{i.name} ({i.birthYear})</span> }
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={ this.state.selectedPersonId } />
            </ErrorBoundry>
        )

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundry>
        )
    }
}
