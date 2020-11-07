import React from "react";
import { StarshipList} from "../SWComponents";
import { withRouter } from "react-router-dom";

const StarshipPage = ({history}) => {
    return <StarshipList onItemSelected={ itemId => history.push(itemId) } />
}

export default withRouter(StarshipPage);
