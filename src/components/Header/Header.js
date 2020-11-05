import React from "react";
import "./Header.scss";

const Header = ({onServiceChange}) => {
    return (
        <div className="header d-flex">
            <h3>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">
                    Star DB
                </a>
            </h3>
            <ul className="d-flex">
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">People</a>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">Planets</a>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">Starships</a>
                </li>
            </ul>
            <button className="btn btn-primary btn-sm" onClick={onServiceChange}>
                Change service
            </button>
        </div>
    );
}

export default Header;
