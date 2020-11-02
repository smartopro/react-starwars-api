import React from "react";

const SwapiServiceContext = React.createContext();

const {
    Provider: SwapiServiceProvider,
    Consumer: SwapiServiceConsumer
} = SwapiServiceContext;

export {
    SwapiServiceProvider,
    SwapiServiceConsumer,
    SwapiServiceContext
};
