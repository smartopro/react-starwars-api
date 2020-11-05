import React from "react";
import PropTypes from "prop-types";

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

Row.propTypes = {
    Left: PropTypes.element,
    Right: PropTypes.node
}

Row.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.oneOf(["user", "admin"])
    })
}

export default Row;
