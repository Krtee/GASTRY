import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import publicRoutes from './Public'
import protectedRoutes from './Protected'

class Routes extends Component {
    componentDidMount() {
        if (this.props.location.pathname === "/") {
            if (this.props.token !== null) {
                this.props.history.push("/home");
            } else {
                this.props.history.push("/login");
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.token !== this.props.token && this.props.token === null) {
            this.props.history.replace("/login");
        }
        if (prevProps.token !== this.props.token && this.props.token !== null) {
            this.props.history.replace("/home");
        }
    }

    //TODO : ask for authtoken and redirect to login if necessary

    render() {
        return (
            <Switch>
                {this.props.token && protectedRoutes}
                {publicRoutes}
            </Switch>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

export default withRouter(connect(mapsStateToProps)(Routes));
