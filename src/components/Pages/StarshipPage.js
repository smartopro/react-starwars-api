import React from "react";
import {StarshipDetails, StarshipList} from "../SWComponents";
import Row from "../Row";

export default class StarshipPage extends React.Component {
    state = {
        selectedItem: null
    }

    select(selectedItem) {
        this.setState({selectedItem});
    }

    onItemSelected = selectedItem => {
        this.select(selectedItem)
    }

    render() {
        return <Row left={<StarshipList onItemSelected={this.onItemSelected} />}
                    right={<StarshipDetails itemId={this.state.selectedItem} />} />
    }
}
