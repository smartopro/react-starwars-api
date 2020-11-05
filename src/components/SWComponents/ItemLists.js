import React from "react";
import ItemList from "../ItemList";
import {
    withData,
    withSwapiService,
    withChildFunction,
    compose
} from "../HOCHelphers";

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

// const PersonList = withSwapiService(mapPersonMethodToProps)(
//                        withData(
//                            withChildFunction(renderName)(
//                                ItemList)));
const PersonList = compose(
                       withSwapiService(mapPersonMethodToProps),
                       withData,
                       withChildFunction(renderName)
                   )(ItemList);

const PlanetList = compose(
                       withSwapiService(mapPlanetMethodToProps),
                       withData,
                       withChildFunction(renderName)
                   )(ItemList);

const StarshipList = compose(
                         withSwapiService(mapStarshipMethodToProps),
                         withData,
                         withChildFunction(renderNameAndModel)
                     )(ItemList);

export { PersonList,
         PlanetList,
         StarshipList };
