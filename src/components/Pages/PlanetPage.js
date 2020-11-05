import React from "react";
import {PlanetDetails, PlanetList} from "../SWComponents";
import Row from "../Row";

export default class PlanetPage extends React.Component {
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
        return <Row left={<PlanetList onItemSelected={this.onItemSelected} />}
                    right={<PlanetDetails itemId={this.state.selectedItem} />} />
    }
}
