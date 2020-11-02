import React from "react";
import ItemDetails from "../ItemDetails";
import Record from "../Record";
import {withSwapiService} from "../HOCHelphers";

const PlanetDetails = props => (
    <ItemDetails {...props} >
        <Record field="population" label="Population" />
        <Record field="period" label="Rotation period" />
        <Record field="diameter" label="Diameter" />
    </ItemDetails>
)

const mapMethodsToProps = swapiService => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
}

export default withSwapiService(PlanetDetails, mapMethodsToProps);
