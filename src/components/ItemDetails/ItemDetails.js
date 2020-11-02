import React from "react";
import "./ItemDetails.scss";
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";
import ErrorButton from "../ErrorButton";

export default class ItemDetails extends React.Component {
    state = {
        itemId: null,
        loading: false,
        image: null
    }

    swapiService = new SwapiService();

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.itemId !== prevProps.itemId) this.updateItem();
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) return;

        this.setState({
            loading: true,
        });

        getData(itemId)
            .then(item => { this.setState({
                item,
                image: getImageUrl(item),
                loading: false
            }) })
    }

    render() {
        if (!this.state.item && !this.state.loading) {
            return <span className="person-details">Select person from list</span>;
        }
        if (this.state.loading) return <Spinner />;

        const { item, image } = this.state;
        const {name} = item;

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={ image }
                     alt="item" />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child, idx) => {
                                return React.cloneElement(child, {
                                    item
                                });
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        )
    }
}
