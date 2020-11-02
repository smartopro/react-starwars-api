import React from "react";
import ItemList from "../ItemList";
import {
    withDataHOC,
    withSwapiService
} from "../HOCHelphers";

const withChildFunction = (Wrapped, fn) => {
    return props => {
        return (
            <Wrapped {...props}>
                { fn }
            </Wrapped>
        )
    }
}

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndModel = ({name, model}) => <span>{name} ({model})</span>;

const mapPersonMethodToProps = swapiService => ({
    getData: swapiService.getAllPeople
});

const mapPlanetMethodToProps = swapiService => ({
    getData: swapiService.getAllPlanets
});

const mapStarshipMethodToProps = swapiService => ({
    getData: swapiService.getAllStarships
});

const PersonList = withSwapiService(
    withDataHOC(withChildFunction(ItemList, renderName)),
    mapPersonMethodToProps
);

const PlanetList = withSwapiService(
    withDataHOC(withChildFunction(ItemList, renderName)),
    mapPlanetMethodToProps
);

const StarshipList = withSwapiService(
    withDataHOC(withChildFunction(ItemList, renderNameAndModel)),
    mapStarshipMethodToProps
)

export { PersonList,
         PlanetList,
         StarshipList };
