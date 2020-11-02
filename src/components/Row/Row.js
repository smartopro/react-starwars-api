import React from "react";

const Row = ({left, right}) => {
    return (
        <div className="row mb2 App__panel">
            <div className="col-md-6 App__list">
                { left }
            </div>
            <div className="col-md-6 App__details">
                { right }
            </div>
        </div>
    )
}

export default Row;
