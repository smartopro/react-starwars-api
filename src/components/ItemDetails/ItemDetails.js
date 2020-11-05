import React from "react";
import "./ItemDetails.scss";
import Spinner from "../Spinner";
import ErrorButton from "../ErrorButton";
import ErrorBoundry from "../ErrorBoundry";

export default class ItemDetails extends React.Component {
    state = {
        itemId: null,
        loading: false,
        image: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.setState({
                item: null
            });
        }

        if(this.props.itemId !== prevProps.itemId) this.updateItem();
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) return;

        this.setState({
            loading: true,
        });

        getData(itemId)
            .then(item => {
                const state = {
                    item,
                    image: getImageUrl(item),
                    loading: false
                }

                this.setState(state);
            })
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
                <ErrorBoundry>
                <img className="person-image"
                     src={ image }
                     alt="item" />
                </ErrorBoundry>

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
