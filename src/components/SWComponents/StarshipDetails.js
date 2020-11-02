import React from "react";
import ItemDetails from "../ItemDetails";
import Record from "../Record";
import {withSwapiService} from "../HOCHelphers";

const StarshipDetails = props => (
    <ItemDetails {...props}>
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
    </ItemDetails>
);

const mapMethodsToProps = swapiService => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
}

export default withSwapiService(StarshipDetails, mapMethodsToProps);
