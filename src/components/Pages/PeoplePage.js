import React from "react";
import { withRouter } from "react-router-dom";
import {PersonDetails, PersonList} from "../SWComponents";
import Row from "../Row";

const PeoplePage = ({match, history}) => {
    return (
        <Row left={<PersonList onItemSelected={ itemId => history.push(itemId) } />}
             right={<PersonDetails itemId={ match.params.id } />} />
    )
}

export default withRouter(PeoplePage);
