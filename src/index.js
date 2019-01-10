import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends Component {

    //good place to do our one time setup or initialization
    //avoid doing data loading in a constructor
    // constructor(props) {
    //     super(props);
    //     //this is the only time you can do direct assignment to your state
    //     this.state = {
    //         lat: null,
    //         long: null,
    //         errorMessage: ""
    //     };
    // }

    //condensed way of initializing state(babel will write the same code)
    state = {
        lat: null,
        long: null,
        errorMessage: ""
    };


    //to do some initial data loading for component
    //to get outside process like getting data one time
    //gets invoked one time
    componentDidMount() {
        console.log("component did mount");
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                //to update your state you call setState
                // you can not update your state directly
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            },
            (error) => {
                console.error(error.message)
                this.setState({ errorMessage: error.message })
            }
        )
    }

    //Good place to do more data loading when state/props change
    componentDidUpdate() {
        console.log("component did update");
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat && !this.state.long) {
            return (
                <div className="ui negative message">
                    <i className="close icon"></i>
                    <div className="header">
                        Error :
                    </div>
                    <p>{this.state.errorMessage}</p>
                </div>
            )
        }

        if (this.state.lat && this.state.long) {
            return (
                <div>
                    <SeasonDisplay lat={this.state.lat} long={this.state.long} />
                </div>
            )
        }
        return <Spinner message="Please accept location request" />
    }

    // it gets called at some point of the lifecycle of a component
    // avoid doing anything besides returning jsx
    render() {
        return (
            <div className="ui container">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)