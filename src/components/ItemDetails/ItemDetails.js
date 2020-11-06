import React from "react";
import "./ItemDetails.scss";
import Spinner from "../Spinner";
import ErrorButton from "../ErrorButton";
import ErrorBoundry from "../ErrorBoundry";
import ErrorIndicator from "../ErrorIndicator";

export default class ItemDetails extends React.Component {
    state = {
        itemId: null,
        loading: false,
        image: null,
        error: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }

        if(this.props.itemId !== prevProps.itemId) this.updateItem();
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) return;

        this.setState({
            loading: true,
            error: false
        });

        getData(itemId)
            .then(item => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false,
                    error: false
                });
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            })
    }

    render() {
        const { item, image, loading, error } = this.state;

        if(error) {
            return <ErrorIndicator />
        }

        if (!item && !loading) {
            return <span className="person-details">Select item from list</span>;
        }
        if (loading) return <Spinner />;

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
