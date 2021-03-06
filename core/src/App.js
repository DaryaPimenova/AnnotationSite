import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "./actions";
import annotationApp from "./reducers";

import {
    SignInForm,
    SignUpForm,
    Detection,
    Classification,
    Statistics,
    Menu,
    NotFound,
    MainPage,
    OurGallery
} from "./components";


let store = createStore(annotationApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    LoadingRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let { LoadingRoute } = this;

        return (
            <BrowserRouter>
                <Switch>
                    <LoadingRoute exact path="/" component={MainPage} />
                    <LoadingRoute exact path="/gallery" component={OurGallery} />

                    <LoadingRoute path="/detection" component={Detection} />
                    <LoadingRoute path="/classification" component={Classification} />

                    <LoadingRoute exact path="/statistics" component={Statistics} />
                    <Route exact path="/register" component={SignUpForm} />
                    <Route exact path="/login" component={SignInForm} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => dispatch(auth.loadUser()),
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}
