import React from "react";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

const withData = (View) => {
    return class extends React.Component {
        state = {
            data: null,
            loading: false,
            error: false
        }

        updateData() {
            this.setState({
                loading: true,
                error: false
            });

            this.props.getData()
                .then(data => {
                    this.setState({
                        data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        error: true
                    })
                });
        }

        componentDidMount() {
            this.updateData();
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevProps.getData !== this.props.getData) this.updateData();
        }

        render() {
            const {data, loading, error} = this.state;

            if (loading || !data) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator />
            }

            return <View {...this.props} data={data} />
        }
    }
}

export default withData;
