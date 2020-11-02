import React from "react";
import "./ErrorIndicator.scss";
import icon from "./death-star.png";

const ErrorIndicator = error => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon"/>
            <span className="boom">BOOM!</span>
            <span>
                something has gone terribly wrong
            </span>
            <span>
                { error.message ? error.message.toString() : "" }
            </span>
        </div>
    )
}

export default ErrorIndicator;
