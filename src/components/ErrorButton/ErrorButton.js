import React from "react";
import "./ErrorButton.scss";

export default class ErrorButton extends React.Component {
    state = {
        throwError: false
    }

    onClick = () => {
        this.setState({
            throwError: true
        });
        //this.gg.hh = 0;
    }

    render() {
        if (this.state.throwError) {
            this.foo.bar = 0;
        }

        return (
            <button className="btn btn-danger"
                    onClick={ this.onClick }>
                Throw exception
            </button>
        )
    }
}
