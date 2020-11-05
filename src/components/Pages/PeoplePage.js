import React from "react";
import {PersonDetails, PersonList} from "../SWComponents";
import Row from "../Row";

export default class PeoplePage extends React.Component {
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
        return <Row left={<PersonList onItemSelected={this.onItemSelected} />}
                    right={<PersonDetails itemId={this.state.selectedItem} />} />
    }
}
